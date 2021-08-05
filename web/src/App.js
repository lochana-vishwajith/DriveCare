import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.light.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import TrafficOfficerReg from "./Components/TrafficOfficerManagement/TrafficOicRegisterComponent/trafficOfficerReg";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route to="/" component={TrafficOfficerReg} />
          </Switch>
        </Router>
      </div>
    );
  }
}
