import 'babel-polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import express from 'express';
import bodyParser from 'body-parser';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';

import defaultInitialState from './config/initialState';
import * as reducers from './reducers';

import getRoutes from './config/routes';

const PORT = process.env.RENDER_SERVER_PORT || 9009;

const app = express();


export default function () {
  app.use(bodyParser.json({ limit: '50mb' }));

  app.post('/render', function (req, res) { // eslint-disable-line prefer-arrow-callback
    const body = req.body.props;

    const state = JSON.parse(JSON.stringify(defaultInitialState));

    const reducer = combineReducers(reducers);

    const store = createStore(reducer, state);

    const routes = getRoutes(store);

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
        const html = renderToString(
          <Provider store={store}>
            <IntlProvider locale={state.locale.language}>
              <RouterContext {...renderProps} />
            </IntlProvider>
          </Provider>
        );

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
