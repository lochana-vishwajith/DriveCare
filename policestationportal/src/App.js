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
import PoliceStationDashboard from "./Components/PoliceStationDashboard/PoliceStationDashboard";
import MyStation from "./Components/MyStation/MyStation"

import Header from "./Components/HeaderComponent/header";
import AuthContext, { AuthProvider } from "./Reducer/UseReducer";
import MyRequest from "./Components/MyRequests/MyDeleterequests";
import MyDeleteRequest from "./Components/MyRequests/MyDeleterequests";
import ViewAdminInformation from "./Components/ShowAdminDetails/ShowAdminDetails";
export default class App extends Component {
  render() {
    return (
      <div>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={PoliceStationLogin} />
              <Route exact path="/display" component={display} />
              <Route exact path="/register" component={register} />
              <Route exact path="/dashboard" component={PoliceStationDashboard} />
              <Route exact path="/myStation" component={MyStation} />
              <Route exact path="/myStationRequest" component={MyDeleteRequest} />
              <Route exact path="/viewAdmin" component={ViewAdminInformation} />
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    );
  }
}
