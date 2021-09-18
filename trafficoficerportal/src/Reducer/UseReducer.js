import React, { Component } from "react";

const AuthContext = React.createContext();

export class AuthProvider extends Component {
  state = {
    isAutheticated: false,
    officerOne: "",
    officerTwo: "",
  };

  logIn = () => {
    this.setState({ isAutheticated: true });
  };

  setOfficerId = (officerOne, officerTwo) => {
    this.setState({ officerOne, officerTwo });
  };

  render() {
    const { isAutheticated, officerOne, officerTwo } = this.state;
    const { logIn, setOfficerId } = this;
    return (
      <AuthContext.Provider
        value={{ isAutheticated, officerOne, officerTwo, logIn, setOfficerId }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
export default AuthContext;
