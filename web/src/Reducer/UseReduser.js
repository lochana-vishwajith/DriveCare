// export const initialState = null;

// export const reducer = (state, action) => {
//   if (action.type === "DRIVER") {
//     return action.payload;
//   }

//   return state;
// };
import React, { Component } from "react";

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    isAutheticated: false,
    DriverID: "",
  };

  logIn = () => {
    this.setState({ isAutheticated: true });
  };

  setDriverId = (driverID) => {
    this.setState({ DriverID: driverID });
  };

  render() {
    const { isAutheticated, DriverID } = this.state;
    const { logIn, setDriverId } = this;
    return (
      <AuthContext.Provider
        value={{ isAutheticated, DriverID, logIn, setDriverId }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export default AuthContext;
