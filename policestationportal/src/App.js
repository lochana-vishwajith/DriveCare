import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.light.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";

import PoliceStationLogin from "./Components/PoliceStationLogin/PoliceStationLogin";
import display from "./Components/PoliceStation/OfficerDetailsDisplay/officerDetailsDisplay";
import register from "./Components/PoliceStation/TrafficOicRegisterComponent/trafficOfficerReg";
import Header from "./Components/HeaderComponent/header";
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={PoliceStationLogin} />
            <Route exact path="/display" component={display} />
            <Route exact path="/register" component={register} />
          </Switch>
        </Router>
      </div>
    );
  }
}
