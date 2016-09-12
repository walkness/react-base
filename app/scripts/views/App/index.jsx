import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { intlShape } from 'react-intl';


const App = (props, context) => {
  const routeName = props.children.props.route.name;

  return (
    <div id='app' className={routeName}>

      <Helmet
        title=''
        defaultTitle=''
        titleTemplate='%s | '
        htmlAttributes={{
          lang: context.intl.locale,
        }}
      />

        { props.children }

    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};

App.contextTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps, {
  })(App);
