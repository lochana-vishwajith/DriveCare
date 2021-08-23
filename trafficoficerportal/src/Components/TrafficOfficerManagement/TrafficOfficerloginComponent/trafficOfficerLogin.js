import "./trafficOfficerLogin.css";
import React, { useContext, useState } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Button from "../../ButtonComponent/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserContext } from "../../../App";
import { Link, useHistory } from "react-router-dom";

toast.configure();

function TrafficOfficerLogin() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [officerOne, setofficerOne] = useState("");
  const [officerTwo, setofficerTwo] = useState("");
  const [logo] = useState(
    "https:firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628967576900_colored-logo.png?alt=media&token=166ac21d-89be-45b2-9b0b-17e5a400e359"
  );
  const [officerPassword, setofficerPassword] = useState("");

  function pressLoginBtn() {
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
          dispatch({ type: "USER", payload: true });
          await axios
            .get(
              `http://localhost:9000/trafficOfficer/officerreg/${officerTwo}`
            )
            .then((result) => {
              console.log("officer two details : ", result.data);
              localStorage.setItem("officerOne", res.data.id);
              localStorage.setItem("officerTwo", result.data._id);
              toast.success("Login Success", {
                position: toast.POSITION.TOP_RIGHT,
              });
              setTimeout(() => {
                history.push("/createFine");
              }, 5000);
            });
        });
    }
  }

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
                        value={officerOne}
                        showClearButton={true}
                        onValueChanged={(e) => {
                          setofficerOne(e.value);
                        }}
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
                        onValueChanged={(e) => {
                          setofficerTwo(e.value);
                        }}
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
                      onValueChanged={(e) => {
                        setofficerPassword(e.value);
                      }}
                    />
                  </div>
                  <br />
                  <br />
                  <br />
                  <center>
                    <Button
                      id={"officerReg"}
                      value={"Login"}
                      classname={"createFineBtn"}
                      type={"submit"}
                      onSubmit={pressLoginBtn}
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
  // }
}
export default TrafficOfficerLogin;
