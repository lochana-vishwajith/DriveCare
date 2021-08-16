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
import OfficerDetailsDisplay from "./Components/TrafficOfficerManagement/OfficerDetailsDisplay/officerDetailsDisplay";
import DriverLogin from "./Components/DriverComponent/DriverLoginComponent/DriverLogin";
import DriverProfile from "./Components/DriverComponent/DriverProfileComponent/DriverProfile";
import DriverProfileUpdate from "./Components/DriverComponent/DriverProfileUpdateComponent/DriverProfileUpdate";
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={TrafficOfficerLogin} />
            <Route exact path="/register" component={TrafficOfficerReg} />
            <Route exact path="/driverRegister" component={DriverReg} />
            <Route exact path="/driverLogin" component={DriverLogin} />
            <Route
              exact
              path="/officerDisplay"
              component={OfficerDetailsDisplay}
            />
            <Route exact path="/driverDisplay" component={DriverProfile} />
            <Route
              exact
              path="/driverProfileUpdate"
              component={DriverProfileUpdate}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
