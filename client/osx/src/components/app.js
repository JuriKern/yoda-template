"use strict"

const React = require('react');
const ReactDom = require('react-dom');

require('../scss/index.scss');

var App = React.createClass({
  render: function() {
    return <h1>Hello world!</h1>;
  }
});

ReactDom.render(<App/>, document.getElementById('app-root'));