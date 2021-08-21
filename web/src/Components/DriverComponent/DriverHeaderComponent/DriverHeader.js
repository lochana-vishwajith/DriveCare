import React, { Component } from "react";
import "./DriverHeader.css";
import { Navbar, Nav, Container } from "react-bootstrap";

export default class DriverHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc",
    };
  }
  render() {
    return (
      <div className="d-space">
        <Navbar collapseOnSelect fixed="top" className="officerNav">
          <Container>
            <Navbar.Toggle id="responsive-navbar-nav" />
            <Navbar.Collapse aria-controls="responsive-navbar-nav">
              <Nav.Link href="/">
                <img
                  src={this.state.logo}
                  class="w-100 shadow-1-strong rounded mb-2"
                  id="driveLoginLogoH"
                  alt=""
                />
              </Nav.Link>
              <Nav className="me-auto float-right">
                <Nav.Link href="/driverLogin">Login</Nav.Link>
                <Nav.Link href="/driverRegister">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
