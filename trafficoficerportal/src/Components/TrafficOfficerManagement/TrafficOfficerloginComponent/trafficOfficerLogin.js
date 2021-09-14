import "./trafficOfficerLogin.css";
import React, { useContext, useState, Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import ButtonCom from "../../ButtonComponent/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { UserContext } from "../../../App";
import { Link, useHistory } from "react-router-dom";
import firebase from "../../../firebase/firebase";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";

import ModalExample from "../../OTPPopupComponent/otpPopup";
import AuthContext from "../../../Reducer/UseReducer";

toast.configure();

class trafficOfficerLogin extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      officerOne: "",
      officerTwo: "",
      officerIDOne: "",
      officerIdTwo: "",
      officerPassword: "",
      logo: "https:firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628967576900_colored-logo.png?alt=media&token=166ac21d-89be-45b2-9b0b-17e5a400e359",
    };
  }

  setofficerOne = (e) => {
    this.setState({ officerOne: e.value });
  };

  setofficerTwo = (e) => {
    this.setState({ officerTwo: e.value });
  };

  setofficerPassword = (e) => {
    this.setState({ officerPassword: e.value });
  };

  pressLoginBtn = (e) => {
    const { history } = this.props;
    const { setOfficerId, logIn } = this.context;
    const { officerOne, officerTwo, officerPassword } = this.state;
    e.preventDefault();
    if (officerOne == "" || officerTwo == "" || officerPassword == "") {
      toast.error("Please Fill The Form Correctly", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      console.log("one and Two : ", officerOne, " , ", officerPassword);
      const credentials = {
        officerReg: officerOne,
        password: officerPassword,
      };

      axios
        .post("http://localhost:9000/trafficOfficer/login", credentials)
        .then(async (res) => {
          console.log("res in log : ", res);
          this.setState({ officerIDOne: res.data.id });
          await axios
            .get(
              `http://localhost:9000/trafficOfficer/officerreg/${officerTwo}`
            )
            .then(async (result) => {
              this.setState({ officerIdTwo: result.data._id });
              console.log("officer two details : ", result.data);
              await this.onSignInSubmit(result.data.mobile);
              toast.success("Login Success", {
                position: toast.POSITION.TOP_RIGHT,
              });
              console.log(
                "officer one ID : ",
                res.data.id,
                " offcer 2 id : ",
                result.data._id
              );
              setTimeout(() => {
                logIn();
                setOfficerId(this.state.officerIDOne, this.state.officerIdTwo);
                history.push("/createFine");
              }, 5000);
            });
        });
    }
  };

  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
        },
      }
    );
  };

  onSignInSubmit = (mobile) => {
    this.configureCaptcha();
    const phoneNumber = `+94${mobile}`;
    console.log(phoneNumber);
    const appVerifier = window.recaptchaVerifier;

    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
      });
  };
  render() {
    const { logo, officerOne, officerTwo, officerPassword } = this.state;

    return (
      <div className="container" id="login">
        <Grid>
          <Paper elevation={20}>
            <div className="trafficloginmaindiv">
              <div className="trafficloginform">
                <center>
                  <img
                    src={logo}
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
                    <b>Login to explore</b>
                  </h2>
                </label>
                <hr className="loginhr" />
                <div class="dx-fieldset">
                  <div class="dx-field">
                    <br />
                    <br />
                    <form>
                      <div id="sign-in-button"></div>
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
                            value={officerOne}
                            showClearButton={true}
                            onValueChanged={this.setofficerOne}
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
                            value={officerTwo}
                            showClearButton={true}
                            onValueChanged={this.setofficerTwo}
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
                          value={officerPassword}
                          onValueChanged={this.setofficerPassword}
                        />
                      </div>
                      <br />
                      <br />
                      <br />
                      <center>
                        <ButtonCom
                          id={"officerReg"}
                          value={"Login"}
                          classname={"createFineBtn"}
                          type={"submit"}
                          onSubmit={this.pressLoginBtn}
                        />
                        <br />
                        <br />
                        <p className="pwForgot">
                          <b>Forgot Your Password?</b>
                        </p>
                      </center>
                    </form>
                  </div>
                </div>
                <br />
                <br />
              </div>
              <div className="trafficloginlogo">
                <center>
                  <img
                    src={logo}
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

export default trafficOfficerLogin;
