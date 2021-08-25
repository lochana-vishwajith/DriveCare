import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.light.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";

import AddComment from "./Components/CourtComponent/AddComment/AddComment";
import CourtLogin from "./Components/CourtComponent/CourtLogin/CourtLogin";
import SearchDriver from "./Components/CourtComponent/SearchDriver/SearchDriver";
import EditComment from "./Components/CourtComponent/EditComment/EditComment";
import DriverDetails from "./Components/CourtComponent/DriverDetails/DriverDetails";
import DriverComments from "./Components/CourtComponent/DriverComments/DriverComments";
import OfficerDetails from "./Components/CourtComponent/OfficerDetails/OfficerDetails";
import ChangePoints from "./Components/CourtComponent/ChangePoints/ChangePoints";
import AddCommentPolice from "./Components/CourtComponent/AddCommentPolice/AddCommentPolice";
import JudgeRegister from "./Components/CourtComponent/JudgeRegister/JudgeRegister";
import CourtFooter from "./Components/CourtComponent/CourtFooter/CourtFooter";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/courtAddComment" component={AddComment} />
            <Route
              exact
              path="/courtAddCommentpolice"
              component={AddCommentPolice}
            />
            <Route exact path="/" component={CourtLogin} />
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
            <Route exact path="/judgeRegister" component={JudgeRegister} />
          </Switch>

          <CourtFooter />
        </Router>
      </div>
    );
  }
}
