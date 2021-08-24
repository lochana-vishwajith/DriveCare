import React, { useContext, useState } from "react";
import "./trafficOfficerHeader.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import { UserContext } from "../../../App";

export default function TrafficOfficerHeader() {
  const [show, setShow] = useState(true);
  const [logo] = useState(
    "https:firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc "
  );
  const { state, dispatch } = useContext(UserContext);
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     show: true,
  //     offlicerOne: "",
  //     officerTwo: "",
  //     logo: "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc",
  //   };
  // }

  // render() {
  // const { offlicerOne, officerTwo } = this.state;
  return (
    <div>
      {state && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand text-info" href="#">
              <img src={logo} id="driveLoginLogoH" alt="" />
            </a>
            <button
              className="navbar-toggler border border-info text-info"
              onClick={() => {
                setShow(!show);
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
                  <a className="nav-link" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    View Fines
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Profile
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      {!state && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img
                src={logo}
                class="w-100 shadow-1-strong rounded mb-4"
                id="driveLoginLogoH"
                alt=""
              />
            </a>
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
// }
