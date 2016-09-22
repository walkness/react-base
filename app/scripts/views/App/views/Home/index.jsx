import React from 'react';

import yesImg from '../../../../../images/yes.png';


export default () => (
  <main className='container-fluid'>

    <div className='jumbotron' style={{ marginTop: '15px', textAlign: 'center' }}>

      <h1>It works!</h1>

      <img src={yesImg} alt='Yes!' />

    </div>

  </main>
);
