//export const initialState = null;

// export const reducer = (state, action) => {
//   if (action.type === "USER") {
//     return action.payload;
//   }

//   return state;
// };
import React, { Component } from "react";

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    isAutheticated: false,
    stationID: "",
  };

  logIn = () => {
    this.setState({ isAutheticated: true });
  };

  setStationId = (stationID) => {
    this.setState({ stationID });
  };

  render() {
    const { isAutheticated, stationID } = this.state;
    const { logIn, setStationId } = this;
    return (
      <AuthContext.Provider
        value={{ isAutheticated, stationID, logIn, setStationId }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export default AuthContext;
