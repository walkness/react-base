/* globals window document */

import 'react-hot-loader/patch';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import ga from 'react-ga';
import { AppContainer } from 'react-hot-loader';

import reducer from 'reducers';
import rootSaga from 'sagas';

import Root from './Root';

import '../styles/main.scss';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_BROWSER = process.env.APP_ENV === 'browser';

const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ),
);

store.close = () => store.dispatch(END);

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextReducer = require('./reducers').default; // eslint-disable-line global-require

    store.replaceReducer(nextReducer);
  });
}

sagaMiddleware.run(rootSaga);

if (IS_BROWSER && IS_PRODUCTION) {
  ga.initialize('UA-XXXXXXXX-X');
}

function runApp() {
  render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('root'),
  );

  if (module.hot) {
    module.hot.accept('./Root.jsx', () => {
      const NextRoot = require('./Root').default; // eslint-disable-line global-require

      render(
        <AppContainer>
          <NextRoot store={store} />
        </AppContainer>,
        document.getElementById('root'),
      );
    });
  }
}

if (!global.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js',
  ], function (require) { // eslint-disable-line prefer-arrow-callback
    require('intl');
    require('intl/locale-data/jsonp/en');

    runApp();
  });
} else {
  runApp();
}
