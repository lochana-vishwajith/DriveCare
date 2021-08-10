import "./trafficOfficerLogin.css";
import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Button from "../../ButtonComponent/button";

export default class trafficOfficerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officerOneID: "",
      officerTwoID: "",
      officerPassword: "",
      logo: "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628608858660_erik-mclean-ZRns2R5azu0-unsplash.jpg?alt=media&token=2e03d4ea-a040-48a8-9e7f-bbcd5a6af1b4",
    };
  }
  render() {
    return (
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
                      <div className="officerOneID">
                        <label className="loginLong">
                          Officer Registration ID :
                        </label>
                        <label className="loginShort">Officer ID : </label>
                        <TextBox
                          mask="0000000000"
                          className="officerReg"
                          name="officerOneID"
                          showClearButton={true}
                        />
                      </div>
                      <div className="officerTwoID">
                        <label className="loginLong">
                          Patner Officer Registration ID :
                        </label>
                        <label className="loginShort">Patner ID : </label>
                        <TextBox
                          mask="0000000000"
                          className="officerReg"
                          name="officerTwoID"
                          showClearButton={true}
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
                      />
                    </div>
                    <br />
                    <br />
                    <center>
                      <Button
                        id={"officerReg"}
                        value={"Login"}
                        classname={"officerRegBtn"}
                        type={"submit"}
                      />
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
    );
  }
}
