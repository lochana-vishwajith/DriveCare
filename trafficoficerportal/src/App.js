import React, { createContext, useReducer, Component } from "react";
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
import OtpEnterComponent from "./Components/OTPEnterComponent/otpEnterComponent";
import { initialState, reducer } from "../src/Reducer/UseReducer";
import Footer from "./Components/FooterComponent/footer";
import AuthContext, { AuthProvider } from "../src/Reducer/UseReducer";

// export const UserContext = createContext();
class App extends Component {
  render() {
    return (
      <div>
        <AuthProvider>
          <Router>
            <Header />
            <Switch>
              <Route exact path="/" component={TrafficOfficerLogin} />
              <Route exact path="/createFine" component={CreateFineUi} />
              <Route exact path="/profile" component={officerProfile} />
              <Route
                exact
                path="/otpConfirm/:id"
                component={OtpEnterComponent}
              />
            </Switch>

            <Footer />
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
