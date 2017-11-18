/* globals window */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import ga from 'react-ga';

import App from 'views/App';


const logPageView = () => {
  ga.pageview(window.location.pathname);
};

const Root = ({ store, server, renderProps }) => (
  <Provider store={store}>

    <IntlProvider locale='en'>

      { server ?
        <StaticRouter {...renderProps}>
          <App />
        </StaticRouter>
      :
        <BrowserRouter onUpdate={logPageView}>
          <App />
        </BrowserRouter>
      }

    </IntlProvider>

  </Provider>
);

Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  server: PropTypes.bool,
  renderProps: PropTypes.shape({}),
};

Root.defaultProps = {
  server: false,
  renderProps: {},
};

export default Root;
