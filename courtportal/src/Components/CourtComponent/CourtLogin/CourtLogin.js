import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CourtLogin.css";
//import Button from "../../ButtonComponent/button";
import Button from "../../ButtonComponent/button";
import CourtHeader from "../CourtHeader/CourtHeader";

export default class CourtLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dlicenceNo: "",
      password: "",
    };
  }

  render() {
    return (
      <div>
        <div></div>
        <CourtHeader />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container d-margin-top">
          <div className="mt-1">
            <center>
              <div className="d-reg">
                <i>Welcome to</i>
              </div>
              <div className="d-dc">
                <b>DriveCare Court</b>
              </div>
            </center>
            <hr></hr>
          </div>
        </div>
        <div className="container">
          <form>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <br />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <br />
            <br />
            <button
              type="submit"
              style={{ float: "right", backgroundColor: "#920e0e" }}
              className="btn btn-danger"
            >
              SignIn
            </button>
          </form>
        </div>
      </div>
    );
  }
}
