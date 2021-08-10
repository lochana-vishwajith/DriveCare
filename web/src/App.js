import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.light.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import TrafficOfficerLogin from "./Components/TrafficOfficerManagement/TrafficOfficerloginComponent/trafficOfficerLogin";
import TrafficOfficerReg from "./Components/TrafficOfficerManagement/TrafficOicRegisterComponent/trafficOfficerReg";
import DriverReg from "./Components/DriverComponent/DriverRegisterComponent/DriverReg";
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={TrafficOfficerLogin} />
            <Route exact path="/register" component={TrafficOfficerReg} />
            <Route exact path="/driverRegister" component={DriverReg} />
          </Switch>
        </Router>
      </div>
    );
  }
}
