/* globals window document */

import React, { PropTypes } from 'react';
import { Router, RouterContext, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import ga from 'react-ga';

import getRoutes from './config/routes';

const logPageView = () => {
  ga.pageview(window.location.pathname);
};

const routes = getRoutes({});

const Root = ({ store, server, renderProps }) => (
  <Provider store={store}>

    <IntlProvider locale='en'>

    { server ?
      <RouterContext {...renderProps} />
    :
      <Router
        history={browserHistory}
        onUpdate={logPageView}
        routes={routes}
      />
    }

    </IntlProvider>

  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  server: PropTypes.bool,
  renderProps: PropTypes.object,
};

export default Root;
