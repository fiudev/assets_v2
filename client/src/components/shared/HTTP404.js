import React from "react";

export default class HTTP404 extends React.Component {
  componentWillMount = () => (document.title = "No Match -  Assets");

  componentWillUnmount = () => (document.title = "Assets - FIU");

  render() {
    return (
      <h2>
        No match for <code>{this.props.history.location.pathname}</code>
      </h2>
    );
  }
}
