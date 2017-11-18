import 'babel-polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import express from 'express';
import bodyParser from 'body-parser';
import Helmet from 'react-helmet';

import defaultInitialState from 'config/initialState';
import reducer from 'reducers';

import Root from './Root';

const PORT = process.env.RENDER_SERVER_PORT || 9009;

const app = express();


export default function () {
  app.use(bodyParser.json({ limit: '50mb' }));

  app.post('/render', function (req, res) { // eslint-disable-line prefer-arrow-callback
    const body = req.body.props;

    const state = JSON.parse(JSON.stringify(defaultInitialState));

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducer, state, applyMiddleware(sagaMiddleware));
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    const context = {};
    const rootComponent = (
      <Root
        store={store}
        renderProps={{
          context,
          location: req.body.path,
        }}
        server
      />
    );

    const html = renderToString(rootComponent);
    store.close();

    if (context.url) {
      res.json({
        redirect: context.url,
      });
    } else {
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
    }
  });

  app.listen(PORT, function () { // eslint-disable-line prefer-arrow-callback
    console.log(`React render server listening on port: ${PORT}`); // eslint-disable-line no-console
  });
}
