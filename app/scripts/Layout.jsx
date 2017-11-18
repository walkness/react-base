import React from 'react';
import PropTypes from 'prop-types';


const Layout = ({ reactApp, head, initialState, chunks }) => (
  <html // eslint-disable-line jsx-a11y/html-has-lang
    {...head.htmlAttributes.toComponent()}
  >
    <head>

      { head.title.toComponent() }
      { head.meta.toComponent() }
      { head.link.toComponent() }

      { head.style.toComponent() }

      { Object.keys(chunks.styles).map(name => (
        <link key={name} type='text/css' rel='stylesheet' href={chunks.styles[name]} />
      )) }

      { head.script.toComponent() }

    </head>

    <body>

      <div id='root' dangerouslySetInnerHTML={{ __html: reactApp }} />

      <script
        type='text/javascript'
        dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${initialState}` }}
      />

      { Object.keys(chunks.javascript).map(name => (
        <script defer key={name} type='text/javascript' src={chunks.javascript[name]} />
      )) }

    </body>
  </html>
);

Layout.propTypes = {
  head: PropTypes.object.isRequired,
  reactApp: PropTypes.node.isRequired,
  chunks: PropTypes.object.isRequired,
  initialState: PropTypes.string.isRequired,
};

export default Layout;
