import 'babel-polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Helmet from 'react-helmet';

import defaultInitialState from './config/initialState';
import reducer from './reducers';

import Root from './Root';
import getRoutes from './config/routes';

const PORT = process.env.RENDER_SERVER_PORT || 9009;

const app = express();


export default function () {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(cookieParser());

  app.post('/render', function (req, res) { // eslint-disable-line prefer-arrow-callback
    const body = req.body.props;

    const state = JSON.parse(JSON.stringify(defaultInitialState));

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducer, state, applyMiddleware(sagaMiddleware));
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    const routes = getRoutes({ store, cookies: req.cookies });

    match({ routes, location: req.body.path }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.json({
          error,
          markup: null,
        });
      } else if (redirectLocation) {
        res.json({
          redirect: redirectLocation,
        });
      } else if (renderProps) {
        const rootComponent = <Root store={store} renderProps={renderProps} server />;
        const html = renderToString(rootComponent);
        store.close();

        const helmet = Helmet.rewind();

        const head = {
          title: helmet.title.toString(),
          base: helmet.base.toString(),
          meta: helmet.meta.toString(),
          link: helmet.link.toString(),
          script: helmet.script.toString(),
          html: helmet.htmlAttributes.toString(),
        };

        res.json({
          error: null,
          markup: html,
          initialState: store.getState(),
          head,
        });
      } else {
        res.json({
          error: 'Path not found',
        });
      }
    });
  });

  app.listen(PORT, function () { // eslint-disable-line prefer-arrow-callback
    console.log(`React render server listening on port: ${PORT}`); // eslint-disable-line no-console
  });
}
