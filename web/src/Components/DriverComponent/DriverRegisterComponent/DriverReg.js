import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import React, { Component } from "react";
import Button from "../../ButtonComponent/button";
import {
  Validator,
  RequiredRule,
  CompareRule,
  EmailRule,
} from "devextreme-react/validator";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./DriverReg.css";
import { Link } from "react-router-dom";
export default class DriverReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      displayName: "",
      dLisenseNo: "",
      email: "",
      password: "",
      cPassword: "",
      regImage:
        "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628658358662_reg.png?alt=media&token=f766b195-c1d6-4ba9-9ffb-5316841a0c3c",
    };

    this.passwordCompair = this.passwordCompair.bind(this);
    this.onPasswordChanged = this.onPasswordChanged.bind(this);
  }

  passwordCompair() {
    return this.state.password;
  }

  onPasswordChanged(e) {
    this.setState({
      password: e.value,
    });
  }

  fNameChange = (e) => {
    this.setState({ fName: e.value });
  };

  lNameChange = (e) => {
    this.setState({ lName: e.value });
  };

  dNameChange = (e) => {
    this.setState({ displayName: e.value });
  };

  dLicenceChange = (e) => {
    this.setState({ dLisenseNo: e.value });
  };

  emailChange = (e) => {
    this.setState({ email: e.value });
  };

  onSubmit = () => {
    console.log("Submit works");
    const dataSet = {
      firstName: this.state.fName,
      lastName: this.state.lName,
      displayName: this.state.displayName,
      email: this.state.email,
      licenceNumber: this.state.dLisenseNo,
      password: this.state.password,
    };

    console.log("Data: ", dataSet);
    axios
      .post("http://localhost:9000/driver", dataSet)
      .then(async (res) => {
        console.log("Driver Reg", res.data.result._id);
        localStorage.setItem("DriverID", res.data.result._id);
        toast.success("Successfully Registered", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location = `/driverProfileUpdate/${this.state.dLisenseNo}`;
      })
      .catch((error) => {
        console.log("Error Registration Failed", error);
        toast.error("Registration Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-1">
            <center>
              <div className="d-reg">
                <i>Register to</i>
              </div>
              <div className="d-dc">
                <b>DriveCare</b>
              </div>
            </center>
            <hr></hr>
          </div>
          <Grid>
            <Paper elevation={20}>
              <div className="d-center-form">
                <div className="d-center-input">
                  <div className="dx-fieldset">
                    <div className="dx-field d-text-in">
                      <label id="labelName">First Name</label>
                      <TextBox
                        name="fName"
                        value={this.state.fName}
                        onValueChanged={this.fNameChange}
                        showClearButton={true}
                      >
                        <Validator>
                          <RequiredRule message="First Name is required" />
                        </Validator>
                      </TextBox>
                    </div>

                    <div className="dx-field d-text-in">
                      <label id="labelName">Last Name</label>
                      <TextBox
                        name="lName"
                        showClearButton={true}
                        value={this.state.lName}
                        onValueChanged={this.lNameChange}
                      >
                        <Validator>
                          <RequiredRule message="Last Name is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field d-text-in">
                      <label id="labelName">Display Name</label>

                      <TextBox
                        name="displayName"
                        showClearButton={true}
                        value={this.state.displayName}
                        onValueChanged={this.dNameChange}
                      >
                        <Validator>
                          <RequiredRule message="Display Name is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field d-text-in">
                      <label id="labelName">Driving Lincence Number</label>
                      <TextBox
                        name="dLisenseNo"
                        mask="a0000000"
                        showClearButton={true}
                        value={this.state.dLisenseNo}
                        onValueChanged={this.dLicenceChange}
                      >
                        <Validator>
                          <RequiredRule message="Licence Number is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field d-text-in">
                      <label id="labelName">Email</label>
                      <TextBox
                        name="email"
                        showClearButton={true}
                        value={this.state.email}
                        onValueChanged={this.emailChange}
                      >
                        <Validator>
                          <RequiredRule message="Email is required" />
                          <EmailRule message="Email is invalid" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field d-text-in">
                      <label id="labelName">Password</label>
                      <TextBox
                        mode="password"
                        name="password"
                        value={this.state.password}
                        showClearButton={true}
                        onValueChanged={this.onPasswordChanged}
                      >
                        <Validator>
                          <RequiredRule message="Password is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field d-text-in">
                      <label id="labelName">Confirm Password</label>

                      <TextBox mode="password" showClearButton={true}>
                        <Validator>
                          <RequiredRule message="Confirm Password is required" />
                          <CompareRule
                            message="Password and Confirm Password do not match"
                            comparisonTarget={this.passwordCompair}
                          />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="d-btn-aling">
                      <div className="d-btnReg-long">
                        <Button
                          id={"driverReg"}
                          value={"Sign Up"}
                          classname={"driverRegBtn"}
                          type={"submit"}
                          onSubmit={this.onSubmit}
                        />
                      </div>
                      <div className="d-btnReg-short">
                        <Button
                          id={"driverReg"}
                          value={"Sign Up"}
                          classname={"driverRegBtn-short"}
                          type={"submit"}
                          onSubmit={this.onSubmit}
                        />
                      </div>
                      <div className="mt-3">
                        <Link to="/">
                          <small className="d-r-link">
                            Already Have a Account? <b>Sign In</b>
                          </small>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
