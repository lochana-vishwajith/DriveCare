import React, { createContext, useReducer } from "react";
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

import { initialState, reducer } from "../src/Reducer/UseReduser";
export const UserContext = createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  // render() {
  return (
    <div>
      <UserContext.Provider value={{ state, dispatch }}>
        <Router>
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
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
