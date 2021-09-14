import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Header.css";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark " id="navbarNav">
          <div className="container">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc"
              className="w-100 shadow-1-strong rounded mb-4"
              id="driveLoginLogoH"
              alt="img"
            />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navMenu"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navMenu">
              <ul className="navbar-nav ms-auto nav-pills ">
                <li className="nav-item">
                  <a href="/courtSearch" className="nav-link  text-light">
                    <button className="btn btn-success">Search</button>
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link text-light">
                    <button className="btn btn-danger">Logout</button>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* <section className="bg-light text-dark p-3 text-center thicker">
          <div className="container">
            <div>
              <h1>
                <b>{this.props.portal}</b>
              </h1>
            </div>
          </div>
        </section> */}

        {/* <Navbar
          collapseOnSelect
          fixed="top"
          expand="sm"
          variant="dark"
          className="officerNav"
        >
          <Navbar.Toggle id="responsive-navbar-nav" />
          <Navbar.Collapse aria-controls="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/">
                <img
                  src={this.state.logo}
                  class="w-100 shadow-1-strong rounded mb-4"
                  id="driveLoginLogoH"
                  alt=""
                />
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/">
                <button className="btn btn-danger">Logout</button>
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/courtSearch">
                <button className="btn btn-danger search-btn">Search</button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar> */}
      </div>
    );
  }
}
