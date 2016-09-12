/* globals window document */

import React, { PropTypes } from 'react';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import ga from 'react-ga';
import 'bootstrap-loader';

import getRoutes from './config/routes';

const logPageView = () => {
  ga.pageview(window.location.pathname);
};

const routes = getRoutes();

const Root = ({ store }) => (
  <Provider store={store}>

    <IntlProvider locale='en'>

      <Router history={browserHistory} onUpdate={logPageView} routes={routes} />

    </IntlProvider>

  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
