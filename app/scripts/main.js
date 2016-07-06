import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { IntlProvider } from 'react-intl';
import ga from 'react-ga';

import * as reducers from './reducers';
import rootSaga from './sagas';

import routes from './config/routes';

import 'bootstrap-loader';

const initialState = window.__INITIAL_STATE__;

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

const logPageView = () => {
  ga.pageview(window.location.pathname);
};

function runApp() {
  ReactDOM.render(
    <Provider store={store}>

      <IntlProvider locale='en'>

        <Router history={browserHistory} onUpdate={logPageView}>
          { routes(store) }
        </Router>

      </IntlProvider>

    </Provider>,
    document.getElementById('root'));
}

if (!global.Intl) {
  require.ensure([
    'intl',
    'intl/locale-data/jsonp/en.js'
  ], function (require) {
    require('intl');
    require('intl/locale-data/jsonp/en.js');
    runApp()
  });
} else {
  runApp()
}
