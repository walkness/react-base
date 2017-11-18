import 'babel-polyfill';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import express from 'express';
import bodyParser from 'body-parser';
import Helmet from 'react-helmet';

import defaultInitialState from 'config/initialState';
import reducer from 'reducers';
import rootSaga from 'sagas';

import Root from './Root';
import Layout from './Layout';

const PORT = process.env.RENDER_SERVER_PORT || 9009;

const app = express();


export default function (parameters) {
  app.use(bodyParser.json({ limit: '50mb' }));

  app.use(function (req, res) { // eslint-disable-line prefer-arrow-callback
    const body = req.body.props;

    const state = JSON.parse(JSON.stringify(defaultInitialState));

    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(reducer, state, applyMiddleware(sagaMiddleware));
    store.runSaga = sagaMiddleware.run;
    store.close = () => store.dispatch(END);

    const context = {};
    const rootComponent = props => (
      <Root
        store={store}
        renderProps={{
          context,
          location: req.body.path,
        }}
        server
        {...props}
      />
    );

    const renderLayout = props => (
      <Layout
        reactApp={renderToString(rootComponent(props))}
        head={Helmet.rewind()}
        chunks={parameters.chunks()}
        initialState={JSON.stringify(store.getState())}
      />
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      store.runSaga(rootSaga).done.then(() => {
        res.status(200).send(renderToStaticMarkup(renderLayout()));
      }).catch((e) => {
        console.log(e.message);
        if (e.statusCode) {
          // const props = {};
          // if (e.statusCode === 404) {
          //   props.notFound = true;
          // }
          // res.status(e.statusCode).send(renderToStaticMarkup(renderLayout(props)));
          if (e.to) {
            res.redirect(e.statusCode, e.to);
          } else if (e.error && e.error.non_field_errors) {
            res.status(e.statusCode).send(e.error.non_field_errors);
          } else {
            res.status(e.statusCode).send(e.message);
          }
        } else {
          res.status(500).send(e.message);
        }
      });

      renderToString(rootComponent());
      store.close();
    }
  });

  app.listen(PORT, function () { // eslint-disable-line prefer-arrow-callback
    console.log(`React render server listening on port: ${PORT}`); // eslint-disable-line no-console
  });
}
