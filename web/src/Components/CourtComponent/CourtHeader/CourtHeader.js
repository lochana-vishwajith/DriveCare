import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CourtHeader.css";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class CourtHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offlicerOne: "",
      officerTwo: "",
      logo: "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc",
    };
  }
  render() {
    const { offlicerOne, officerTwo } = this.state;
    return (
      <div>
        {offlicerOne != "" && officerTwo != "" && (
          <Navbar collapseOnSelect fixed="top" className="officerNav">
            <Container>
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
                  <Nav.Link href="/createFine">Create Fine</Nav.Link>
                  <Nav.Link href="/officerDisplay">View Fines</Nav.Link>
                  <Nav.Link href="" className="profileOfficer">
                    Profile
                  </Nav.Link>
                  <Nav.Link href="" className="profileOfficer">
                    <i className="fas fa-sign-out-alt" />
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )}
        {offlicerOne == "" && officerTwo == "" && (
          <Navbar
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
            </Navbar.Collapse>
          </Navbar>
        )}
      </div>
    );
  }
}
