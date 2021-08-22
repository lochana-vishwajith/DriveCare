import "./trafficOfficerLogin.css";
import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Button from "../../ButtonComponent/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OfficerHeader from "../TrafficOfficerHeader/trafficOfficerHeader";

toast.configure();

export default class trafficOfficerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officerOne: "",
      officerTwo: "",
      officerPassword: "",
      logo: "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628967576900_colored-logo.png?alt=media&token=166ac21d-89be-45b2-9b0b-17e5a400e359",
    };
  }

  setVal = (e) => {
    localStorage.setItem("officerOne", "6116b0b785807701e005c57f");
    localStorage.setItem("officerTwo", "6116b0b785807701e005c57f");
    this.props.history.push("/createFine");
  };
  officerOneChanged = (e) => {
    this.setState({ officerOne: e.value });
  };
  officerTwoChanged = (e) => {
    this.setState({ officerTwo: e.value });
  };
  officerPWChanged = (e) => {
    this.setState({ officerPassword: e.value });
  };
  pressLoginBtn = () => {
    if (
      this.state.officerOne == "" ||
      this.state.officerTwo == "" ||
      this.state.officerPassword == ""
    ) {
      toast.error("Please Fill The Form Correctly", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.success("Login Success", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  render() {
    return (
      <>
        <OfficerHeader />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
          <Grid>
            <Paper elevation={20}>
              <div className="trafficloginmaindiv">
                <div className="trafficloginform">
                  <center>
                    <img
                      src={this.state.logo}
                      class="w-100 shadow-1-strong rounded mb-4"
                      id="driveLoginLogo"
                      alt=""
                    />
                    <label className="loginWelcomeTextShort">Welcome to</label>
                    <br />
                    <label className="loginWelcomeTextShort" id="loginDrive">
                      <b>DriveCare</b>
                    </label>
                  </center>
                  <br />
                  <label className="loginText">
                    <h2>
                      <b>Login to expore</b>
                    </h2>
                  </label>
                  <hr className="loginhr" />
                  <div class="dx-fieldset">
                    <div class="dx-field">
                      <br />
                      <br />
                      <div className="officerLogin">
                        <div className="officerOne">
                          <label className="loginLong">
                            Officer Registration ID :
                          </label>
                          <label className="loginShort">Officer ID : </label>
                          <TextBox
                            mask="0000000000"
                            className="officerReg"
                            name="officerOne"
                            value={this.state.officerOne}
                            showClearButton={true}
                            onValueChanged={this.officerOneChanged}
                          />
                        </div>
                        <div className="officerTwo">
                          <label className="loginLong">
                            Patner Officer Registration ID :
                          </label>
                          <label className="loginShort">Patner ID : </label>
                          <TextBox
                            mask="0000000000"
                            className="officerReg"
                            name="officerTwo"
                            value={this.state.officerTwo}
                            showClearButton={true}
                            onValueChanged={this.officerTwoChanged}
                          />
                        </div>
                      </div>
                      <br />
                      <div className="officerPW">
                        <label>Password </label>
                        <TextBox
                          mode="password"
                          placeholder="Enter password"
                          name="officerPassword"
                          showClearButton={true}
                          value={this.state.officerPassword}
                          onValueChanged={this.officerPWChanged}
                        />
                      </div>
                      <br />
                      <br />
                      <br />
                      <center>
                        <Button
                          id={"officerReg"}
                          value={"Login"}
                          classname={"officerRegBtn"}
                          type={"submit"}
                          onSubmit={this.setVal}
                        />
                        <br />
                        <br />
                        <p className="pwForgot">
                          <b>Forgot Your Password?</b>
                        </p>
                      </center>
                    </div>
                  </div>
                  <br />
                  <br />
                </div>
                <div className="trafficloginlogo">
                  <center>
                    <img
                      src={this.state.logo}
                      class="w-100 shadow-1-strong rounded mb-4"
                      id="driveLoginLong"
                      alt=""
                    />

                    <div>
                      <label className="loginWelcomeTextLong">Welcome to</label>
                      <br />
                      <label className="loginWelcomeNameTextLong">
                        <b>DriveCare</b>
                      </label>
                    </div>
                  </center>
                </div>
              </div>
            </Paper>
          </Grid>
        </div>
      </>
    );
  }
}
