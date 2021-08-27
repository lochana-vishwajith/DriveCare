import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CourtLogin.css";
//import Button from "../../ButtonComponent/button";
import Button from "../../ButtonComponent/button";

export default class CourtLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    if (
      this.state.username == "judge@nugegoda" &&
      this.state.password == "12345"
    ) {
      alert("Login Sucessfully !");
      //window.location = "/courtSearch";
      window.location = "/courtSearch";
    } else {
      alert("Username or Password is incorrect. Try again !");
    }
  }

  render() {
    return (
      <div>
        <div></div>

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
              <label for="exampleInputEmail1">UserName</label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Username"
                onChange={this.onChange}
              />
              <br />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={this.onChange}
              />
            </div>
            <br />
            <br />
            <button
              onClick={this.onSubmit}
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
