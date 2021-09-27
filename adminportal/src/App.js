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
import PoliceStationAdd from "./Components/CentralAdminComponent/Centraladminpolicestations/PoliceStation/AddPoliceStation/AddPoliceStation";
import AddRuleCategories from "./Components/CentralAdminComponent/RuleCategories/AddRuleCategories/AddRuleCategories";
import AddRules from "./Components/CentralAdminComponent/Rules/AddRule/AddRules";
import PoliceStationList from "./Components/CentralAdminComponent/Centraladminpolicestations/PoliceStation/PoliceStationList/PoliceStationList";
import Viewadmindetails from "./Components/CentralAdminComponent/CentralAdminDataShow/Viewadmindetails";
import PoliceStationViewSearchResult from "./Components/CentralAdminComponent/Centraladminpolicestations/PoliceStation/ViewSearchResultComponent/ViewSearchResult";
import AdminDashboard from "./Components/CentralAdminComponent/CentraladminDashboard/AdminDashboard";
import GetRulesCategoriesList from "./Components/CentralAdminComponent/RuleCategories/GetRulesInCategory/GetrulescategoriesList";
import GetRulesCat from "./Components/CentralAdminComponent/Rules/GetRulesInCategories/GetRulesCat";
import ViewRule from "./Components/CentralAdminComponent/Rules/ViewRule/ViewRule";
import ViewDeletedRules from "./Components/CentralAdminComponent/DeletedRules/ViewDeletedRulesList/viewList";
import ViewDeletedRule from "./Components/CentralAdminComponent/DeletedRules/ViewDeletedRule/ViewDeletedRule";
import DeletePoliceRequests from "./Components/CentralAdminComponent/ShowPoliceStationRequest/DeleteRequest";
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
            <Route   exact path="/addRules/:id" component={AddRules} />
            <Route   exact path="/policestationList" component={PoliceStationList} />
            <Route   exact path="/viewAdminDetails" component={Viewadmindetails} />
            <Route
                exact path="/viewpolicesearch/:id"
              component={PoliceStationViewSearchResult}
            />

            <Route   exact path="/" component={AdminDashboard} />
            <Route   exact path="/rulescategorylist" component={GetRulesCategoriesList} />
            <Route exact path="/getrulescat/:id/:cat" component={GetRulesCat} />
            <Route exact path="/viewrules/:id" component={ViewRule} />
            <Route exact path="/deletedRules" component={ViewDeletedRules} />
            <Route exact path="/drule/:id" component={ViewDeletedRule} />
            <Route exact path="/preqs" component={DeletePoliceRequests} />
          </Switch>
        </Router>
      </div>
    );
  }
}
