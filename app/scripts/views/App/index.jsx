import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { intlShape } from 'react-intl';


class App extends Component {

  static contextTypes = {
    intl: intlShape.isRequired,
  };

  render() {
    const routeName = this.props.children.props.route.name;

    return (
      <div id='app' className={routeName}>

        <Helmet
          title=''
          defaultTitle=''
          titleTemplate='%s | '
          htmlAttributes={{
            'lang': this.context.intl.locale,
          }} />

          { this.props.children }

      </div>
    );
  }

}

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps, {
  })(App);
