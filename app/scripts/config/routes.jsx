import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from '../views/App';
import Home from '../views/App/views/Home';

export default () => (
  <Route path='/' component={App}>
    <IndexRoute name='home' component={Home} />
  </Route>
);
