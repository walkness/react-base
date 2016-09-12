/* globals window document */

import 'react-hot-loader/patch';
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import ga from 'react-ga';
import { AppContainer } from 'react-hot-loader';

import 'bootstrap-loader';

import * as reducers from './reducers';
import rootSaga from './sagas';

import Root from './Root';


const initialState = window.__INITIAL_STATE__; // eslint-disable-line no-underscore-dangle

const reducer = combineReducers(reducers);
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
sagaMiddleware.run(rootSaga);

ga.initialize('UA-XXXXXXXX-X');

function runApp() {
  render(
    <AppContainer>
      <Root store={store} />
    </AppContainer>,
    document.getElementById('root'));

  if (module.hot) {
    module.hot.accept('./Root.jsx', () => {
      const NextRoot = require('./Root').default; // eslint-disable-line global-require

      render(
        <AppContainer>
          <NextRoot store={store} />
        </AppContainer>,
        document.getElementById('root')
      );
    });

    const orgError = console.error; // eslint-disable-line no-console
    console.error = (message) => { // eslint-disable-line no-console
      if (message && message.indexOf('You cannot change <Router routes>;') === -1) {
        // Log the error as normally
        orgError.apply(console, [message]);
      }
    };
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
