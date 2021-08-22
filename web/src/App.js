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
import AddComment from "./Components/CourtComponent/AddComment/AddComment";
import CourtLogin from "./Components/CourtComponent/CourtLogin/CourtLogin";
import DriverProfile from "./Components/DriverComponent/DriverProfileComponent/DriverProfile";
import DriverProfileUpdate from "./Components/DriverComponent/DriverProfileUpdateComponent/DriverProfileUpdate";
import CreateFineUi from "./Components/TrafficOfficerManagement/createFineUI/createFineUi";

import SearchDriver from "./Components/CourtComponent/SearchDriver/SearchDriver";
import EditComment from "./Components/CourtComponent/EditComment/EditComment";
import DriverDetails from "./Components/CourtComponent/DriverDetails/DriverDetails";
import DriverComments from "./Components/CourtComponent/DriverComments/DriverComments";
import OfficerDetails from "./Components/CourtComponent/OfficerDetails/OfficerDetails";
import ChangePoints from "./Components/CourtComponent/ChangePoints/ChangePoints";
import CentralAdminAddDetails from "./Components/CentralAdminComponent/CentralAdminDetails/CentralAdminDataAdd"
import AdminLogin from "./Components/CentralAdminComponent/CentralAdminLogin/CentralAdminLogin"
import OngoingTicket from "./Components/DriverComponent/DriverOngoingTicketComponent/OngoingTicket";
import TicketOverview from "./Components/DriverComponent/DriverTicketOverviewComponent/TicketOverview";
import PoliceStationLogin from "./Components/PoliceStation/Login/PoliceStationLogin"
import AddCommentPolice from "./Components/CourtComponent/AddCommentPolice/AddCommentPolice";
import PoliceStationAdd from "./Components/PoliceStation/AddPoliceStation/AddPoliceStation"
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
            <Route exact path="/" component={TrafficOfficerLogin} />
            <Route exact path="/register" component={TrafficOfficerReg} />
            <Route exact path="/driverRegister" component={DriverReg} />
            <Route exact path="/driverLogin" component={DriverLogin} />
            <Route
              exact
              path="/officerDisplay"
              component={OfficerDetailsDisplay}
            />
            <Route exact path="/driverDisplay/:id" component={DriverProfile} />
            <Route
              exact
              path="/driverProfileUpdate/:id"
              component={DriverProfileUpdate}
            />
            <Route exact path="/createFine" component={CreateFineUi} />
            <Route exact path="/courtAddComment" component={AddComment} />
            <Route
              exact
              path="/courtAddCommentpolice"
              component={AddCommentPolice}
            />
            <Route exact path="/courtLogin" component={CourtLogin} />
            <Route exact path="/courtSearch" component={SearchDriver} />
            <Route exact path="/courtEditComment/:id" component={EditComment} />
            <Route exact path="/courtDriverDetails" component={DriverDetails} />
            <Route
              exact
              path="/courtDriverComments"
              component={DriverComments}
            />
            <Route
              exact
              path="/courtOfficerDetails"
              component={OfficerDetails}
            />
            <Route exact path="/courtChangePoints" component={ChangePoints} />

            <Route exact path = "/centralAdminAdd" component = {CentralAdminAddDetails}/>
            <Route exact path="/ongoingTickets" component={OngoingTicket} />
            <Route exact path="/ticketOverview" component={TicketOverview} />
            <Route exact path = "/adminLogin" component = {AdminLogin} />
            <Route exact path = "/policeStationLogin" component = {PoliceStationLogin} />
            <Route exact path = "/AddPoliceStation" component = {PoliceStationAdd} />
            <Route exact path = "/addRulesCategories" component = {AddRuleCategories} />
            <Route  path = "/addRules" component = {AddRules} />
            <Route  path = "/policestationList" component = {PoliceStationList} />
            <Route  path = "/viewAdminDetails" component = {Viewadmindetails} />
            <Route  path = "/viewpolicesearch/:id" component = {PoliceStationViewSearchResult} />
          </Switch>
        </Router>
      </div>
    );
  }
}
