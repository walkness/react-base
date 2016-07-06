import 'babel-polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import Helmet from 'react-helmet';
import { IntlProvider } from 'react-intl';

import defaultInitialState from './config/initialState';
import * as reducers from './reducers';
import rootSaga from './sagas';

import getRoutes from './config/routes';

const ADDRESS = '127.0.0.1';
const PORT = 9009;

const app = express();
const server = http.Server(app);

app.use(bodyParser.json({limit: '50mb'}));

app.post('/render', function(req, res) {
  const body = JSON.parse(req.body.serializedProps)

  const reducer = combineReducers(reducers);

  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    reducer, Object.assign({}, defaultInitialState),
    applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga)

  const routes = getRoutes(store);

  match({ routes, location: req.body.path }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.json({
        error: error,
        markup: null
      })
    } else if (redirectLocation) {
      res.json({
        redirect: redirectLocation
      })
    } else if (renderProps) {

      const html = renderToString(
        <Provider store={store}>
          <IntlProvider locale={locale.language}>
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
      }

      res.json({
        error: null,
        markup: html,
        initialState: store.getState(),
        head: head
      });
    } else {
      res.json({
        error: 'Path not found'
      });
    }
  })
});

server.listen(PORT, ADDRESS, function() {
  console.log('React render server listening at http://' + ADDRESS + ':' + PORT);
});
