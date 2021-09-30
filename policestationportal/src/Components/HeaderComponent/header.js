import React, { Component } from "react";
import "./header.css";
import AuthContext from "../../Reducer/UseReducer";
import PoliceStationLogin from "../PoliceStationLogin/PoliceStationLogin";
import { Link } from "react-router-dom";

export default class header extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      show: true,
      logo: "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc",
    };
  }
  render() {
    const { isAutheticated } = this.context;
    return (
      <div>
        {isAutheticated && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand text-info" to="#">
                <img src={this.state.logo} id="driveLoginLogoH" alt="" />
              </Link>
              <button
                className="navbar-toggler border border-info text-info"
                onClick={() => {
                  this.setState({ show: !this.state.show });
                }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={
                  this.state.show
                    ? "collapse navbar-collapse"
                    : "collapse navbar-collapse active"
                }
                id="navbarNav"
              >
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/display"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Officer Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
        {!isAutheticated && <PoliceStationLogin />}
      </div>
    );
  }
}
