import React, { useContext, useState, Component } from "react";
import "./trafficOfficerHeader.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import $ from "jquery";
import AuthContext from "../../../Reducer/UseReducer";
// import { UserContext } from "../../../App";

export default class TrafficOfficerHeader extends Component {
  static contextType = AuthContext;
  // const [show, setShow] = useState(true);
  // const [logo] = useState(
  //   "https:firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc "
  // );
  // const { state, dispatch } = useContext(UserContext);
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      logo: "https:firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc ",
    };
  }
  render() {
    const { show, logo } = this.state;
    const { isAutheticated } = this.context;

    return (
      <div>
        {isAutheticated && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand text-info" to="#">
                <img src={logo} id="driveLoginLogoH" alt="" />
              </Link>
              <button
                className="navbar-toggler border border-info text-info"
                onClick={() => {
                  this.setState({ show: !show });
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
                  show
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
                      to="/createFine"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/view">
                      View Fines
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
        {!isAutheticated && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="#">
                <img
                  src={logo}
                  class="w-100 shadow-1-strong rounded mb-4"
                  id="driveLoginLogoH"
                  alt=""
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li></li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </div>
    );
  }
}
// }
