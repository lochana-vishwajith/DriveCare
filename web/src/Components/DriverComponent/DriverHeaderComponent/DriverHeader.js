import { Link } from "@material-ui/core";
import React, { Component } from "react";
import "./DriverHeader.css"

export default class DriverHeader extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light color">
          <Link className="navbar-brand" href="#">
            <img
              src="/docs/4.0/assets/brand/bootstrap-solid.svg"
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            
          </Link>
          <Link className="d-nav-edit">
            <lable>Login</lable>
          </Link>
          <Link>
            <lable>Register</lable>
          </Link>
        </nav>
      </div>
    );
  }
}
