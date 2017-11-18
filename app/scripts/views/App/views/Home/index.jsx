import React from 'react';
import Helmet from 'react-helmet';

import yesImg from 'images/yes.png';

import './styles.scss';


export default () => (
  <main className='container-fluid'>

    <Helmet title='It works!' />

    <div className='jumbotron' styleName='jumbotron'>

      <h1>It works!</h1>

      <img src={yesImg} alt='Yes!' />

    </div>

  </main>
);
