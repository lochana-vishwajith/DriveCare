import React, { Component } from "react";
import "./header.css";

export default class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
      logo: "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc",
    };
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand text-info" href="#">
              <img src={this.state.logo} id="driveLoginLogoH" alt="" />
            </a>
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
                  <a className="nav-link" aria-current="page" href="/display">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Officer Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Office Info
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
