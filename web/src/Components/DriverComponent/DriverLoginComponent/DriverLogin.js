import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { useContext, useState } from "react";
import "./DriverLogin.css";
import Button from "../../ButtonComponent/button";
import axios from "axios";
import { UserContext } from "../../../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useHistory } from "react-router-dom";

toast.configure();

function DriverLogin() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [dlicenceNo, setdlicenceNo] = useState("");
  const [password, setpassword] = useState("");

  function onSubmit() {
    const loginDetails = {
      licenceNumber: dlicenceNo,
      password: password,
    };

    axios
      .post(`http://localhost:9000/driver/login`, loginDetails)
      .then((res) => {
        console.log(res.data.id);
        console.log(res.status);
        localStorage.setItem("DriverID", res.data.id);
        if (res.status === 200) {
          dispatch({ type: "DRIVER", payload: true });
          toast.success("Login Successful", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setTimeout(() => {
            history.push("/driverDisplay");
          }, 2000);
        } else if (res.status === 400) {
          toast.error("Password is Incorrect", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else if (res.status === 401) {
          toast.error("License Number is Incorrect", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      })
      .catch((error) => {
        console.log("Error Login Failed", error);
        toast.error("Login Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  }

  return (
    <div>
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
                      value={dlicenceNo}
                      onValueChanged={(e) => {
                        setdlicenceNo(e.value);
                      }}
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
                      value={password}
                      showClearButton={true}
                      onValueChanged={(e) => {
                        setpassword(e.value);
                      }}
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
                        onSubmit={onSubmit}
                      />
                    </div>
                    <div className="d-btnReg-short">
                      <Button
                        id={"driverReg"}
                        value={"Sign In"}
                        classname={"driverRegBtn-short"}
                        type={"submit"}
                        onSubmit={onSubmit}
                      />
                    </div>
                    <div className="mt-3">
                      <Link to="/driverRegister">
                        <small className="d-link">
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
    </div>
  );
  // }
}

export default DriverLogin;
