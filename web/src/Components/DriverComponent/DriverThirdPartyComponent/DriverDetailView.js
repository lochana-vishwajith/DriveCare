import React, { Component } from "react";

export default class DriverDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverID: this.props.match.params.id,
    };
  }
  render() {
    return (
      <div>
        <h1>Hello {this.state.driverID}</h1>
      </div>
    );
  }
}
