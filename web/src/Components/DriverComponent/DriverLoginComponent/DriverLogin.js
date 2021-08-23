import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import "./DriverLogin.css";
import Button from "../../ButtonComponent/button";
import DriverHeader from "../DriverHeaderComponent/DriverHeader";
import DriverFooter from "../DriverFooterComponent/DriverFooter";
import axios from "axios";
import { useHistory } from "react-router";

export default class DriverLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dlicenceNo: "",
      password: "",
    };
  }

  onDrivingLicenceChanged = (e) => {
    this.setState({ dlicenceNo: e.value });
  };

  onPasswordChanged = (e) => {
    this.setState({ password: e.value });
  };

  onSubmit = () => {
    const { dispatch } = this.props;
    const loginDetails = {
      licenceNumber: this.state.dlicenceNo,
      password: this.state.password,
    };

    axios
      .post(`http://localhost:9000/driver/login`, loginDetails)
      .then((res) => {
        console.log(res.data.id);
        console.log(res.status);
        localStorage.setItem("DriverID", res.data.id);
        if (res.status === 200) {
          dispatch({ type: "DRIVER", payload: true });
          alert("Login Successful");
          useHistory.push("/driverDisplay");
        }
      });
  };

  render() {
    return (
      <div>
        <div>
          <DriverHeader />
        </div>
        <div className="container d-margin-top">
          <div className="mt-1">
            <center>
              <div className="d-reg">
                <i>Welcome to</i>
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
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">Driving Licence Number</label>
                      <TextBox
                        name="dlicenceNo"
                        value={this.state.dlicenceNo}
                        onValueChanged={this.onDrivingLicenceChanged}
                        showClearButton={true}
                      >
                        <Validator>
                          <RequiredRule message="Licence Number is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field" id="d-text-in">
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
                    <div className="d-btn-aling">
                      <div className="d-btnReg-long">
                        <Button
                          id={"driverReg"}
                          value={"Sign In"}
                          classname={"driverRegBtn"}
                          type={"submit"}
                        />
                      </div>
                      <div className="d-btnReg-short">
                        <Button
                          id={"driverReg"}
                          value={"Sign In"}
                          classname={"driverRegBtn-short"}
                          type={"submit"}
                          onSubmit={this.onSubmit}
                        />
                      </div>
                      <div className="mt-3 d-link">
                        <Link to="/driverRegister">
                          <small>
                            Don't Have a Account? <b>Sign Up</b>
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
        <div>
          <DriverFooter />
        </div>
      </div>
    );
  }
}
