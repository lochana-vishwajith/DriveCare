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
import OngoingTicket from "./Components/DriverComponent/DriverOngoingTicketComponent/OngoingTicket";
import TicketOverview from "./Components/DriverComponent/DriverTicketOverviewComponent/TicketOverview";
import AddCommentPolice from "./Components/CourtComponent/AddCommentPolice/AddCommentPolice";

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
            <Route exact path="/ongoingTickets" component={OngoingTicket} />
            <Route exact path="/ticketOverview" component={TicketOverview} />
          </Switch>
        </Router>
      </div>
    );
  }
}
