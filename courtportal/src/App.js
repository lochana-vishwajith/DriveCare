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
import CourtHeader from "./Components/CourtComponent/CourtHeader/CourtHeader";
import ChangePointsDriver from "./Components/CourtComponent/ChangePointsDriver/ChangePointsDriver";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <CourtHeader />
          <Switch>
            <Route exact path="/courtAddComment/:id" component={AddComment} />
            <Route
              exact
              path="/courtAddCommentpolice/:id"
              component={AddCommentPolice}
            />
            <Route exact path="/" component={CourtLogin} />
            <Route exact path="/courtSearch" component={SearchDriver} />
            <Route exact path="/courtEditComment/:id" component={EditComment} />
            <Route
              exact
              path="/courtDriverDetails/:id"
              component={DriverDetails}
            />
            <Route
              exact
              path="/courtDriverComments/:id"
              component={DriverComments}
            />
            <Route
              exact
              path="/courtOfficerDetails/:id"
              component={OfficerDetails}
            />
            <Route
              exact
              path="/courtChangePoints/:id"
              component={ChangePoints}
            />

            <Route
              exact
              path="/courtChangePointsDriver/:id"
              component={ChangePointsDriver}
            />

            <Route exact path="/judgeRegister" component={JudgeRegister} />
          </Switch>

          <CourtFooter />
        </Router>
      </div>
    );
  }
}
