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
import CreateFineUi from "./Components/TrafficOfficerManagement/createFineUI/createFineUi";
import officerProfile from "./Components/TrafficOfficerManagement/OfficerProfileComponent/officerProfile";
import Header from "./Components/TrafficOfficerManagement/TrafficOfficerHeader/trafficOfficerHeader";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={TrafficOfficerLogin} />
            <Route exact path="/createFine" component={CreateFineUi} />
            <Route exact path="/profile" component={officerProfile} />
          </Switch>
        </Router>
      </div>
    );
  }
}
