import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.light.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";

import CentralAdminAddDetails from "./Components/CentralAdminComponent/CentralAdminDetails/CentralAdminDataAdd";
import AdminLogin from "./Components/CentralAdminComponent/CentralAdminLogin/CentralAdminLogin";
import PoliceStationAdd from "./Components/PoliceStation/AddPoliceStation/AddPoliceStation";
import AddRuleCategories from "./Components/CentralAdminComponent/RuleCategories/AddRuleCategories/AddRuleCategories";
import AddRules from "./Components/CentralAdminComponent/Rules/AddRule/AddRules";
import PoliceStationList from "./Components/PoliceStation/PoliceStationList/PoliceStationList";
import Viewadmindetails from "./Components/CentralAdminComponent/CentralAdminDataShow/Viewadmindetails";
import PoliceStationViewSearchResult from "./Components/PoliceStation/ViewSearchResultComponent/ViewSearchResult";
export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/centralAdminAdd"
              component={CentralAdminAddDetails}
            />

            <Route exact path="/adminLogin" component={AdminLogin} />

            <Route
              exact
              path="/AddPoliceStation"
              component={PoliceStationAdd}
            />
            <Route
              exact
              path="/addRulesCategories"
              component={AddRuleCategories}
            />
            <Route path="/addRules" component={AddRules} />
            <Route path="/policestationList" component={PoliceStationList} />
            <Route path="/viewAdminDetails" component={Viewadmindetails} />
            <Route
              path="/viewpolicesearch/:id"
              component={PoliceStationViewSearchResult}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}
