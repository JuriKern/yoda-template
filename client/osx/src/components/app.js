const React = require("react");
const ReactDom = require("react-dom");

const { SpinnerFactory } = require("@blueprintjs/core");

require("@blueprintjs/core/dist/blueprint.css")
require("../scss/index.scss");

var App = React.createClass({
  render: function() {
    return <div>
      <SpinnerFactory/>
    </div>;
  }
});

ReactDom.render(<App/>, document.getElementById("app-root"));