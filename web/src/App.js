import React, { createContext, useReducer, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "devextreme/dist/css/dx.light.css";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
} from "react-router-dom";
import DriverReg from "./Components/DriverComponent/DriverRegisterComponent/DriverReg";
import DriverLogin from "./Components/DriverComponent/DriverLoginComponent/DriverLogin";
import DriverProfile from "./Components/DriverComponent/DriverProfileComponent/DriverProfile";
import DriverProfileUpdate from "./Components/DriverComponent/DriverProfileUpdateComponent/DriverProfileUpdate";
import OngoingTicket from "./Components/DriverComponent/DriverOngoingTicketComponent/OngoingTicket";
import TicketOverview from "./Components/DriverComponent/DriverTicketOverviewComponent/TicketOverview";
import DriverHeader from "./Components/DriverComponent/DriverHeaderComponent/DriverHeader";
import DriverFooter from "./Components/DriverComponent/DriverFooterComponent/DriverFooter";
import DriverSummary from "./Components/DriverComponent/DriverSummaryComponent/DriverSummary";
import ThirdPartySearch from "./Components/DriverComponent/DriverThirdPartyComponent/ThirdPartySearch";
import DriverDetailView from "./Components/DriverComponent/DriverThirdPartyComponent/DriverDetailView";
import AuthContext, { AuthProvider } from "../src/Reducer/UseReduser";

// import { initialState, reducer } from "../src/Reducer/UseReduser";
// export const UserContext = createContext();
// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
class App extends Component {
  render() {
    return (
      <div>
        {/* <UserContext.Provider value={{ state, dispatch }}> */}
        <AuthProvider>
          <Router>
            <DriverHeader />
            <Switch>
              <Route exact path="/driverRegister" component={DriverReg} />
              <Route exact path="/" component={DriverLogin} />
              <Route exact path="/driverDisplay" component={DriverProfile} />
              <Route
                exact
                path="/driverProfileUpdate/:id"
                component={DriverProfileUpdate}
              />
              <Route exact path="/ongoingTickets" component={OngoingTicket} />
              <Route
                exact
                path="/ticketOverview/:id"
                component={TicketOverview}
              />
              <Route exact path="/summary" component={DriverSummary} />
              <Route exact path="/search" component={ThirdPartySearch} />
              <Route exact path="/driver/:id" component={DriverDetailView} />
            </Switch>
            <DriverFooter />
          </Router>
          {/* </UserContext.Provider> */}
        </AuthProvider>
      </div>
    );
  }
}

export default App;
