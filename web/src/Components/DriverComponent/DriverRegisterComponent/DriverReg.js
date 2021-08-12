import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import React, { Component } from "react";
import DateBox from "devextreme-react/date-box";
import Button from "../../ButtonComponent/button";
import {
  Validator,
  RequiredRule,
  EmailRule,
  AsyncRule,
} from "devextreme-react/validator";

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
  }

  render() {
    return (
      <div className="container">
        <div className="outerDiv">
          <center>
            {/* <img
              src={this.state.regImage}
              alt="register"
              width="200px"
              height="60px"
            /> */}
            <h4>Register to</h4>
            <h1>
              <strong>DriveCare</strong>
            </h1>
          </center>
          <hr />
          <br />
          <Grid>
            <Paper elevation={20}>
              <div className="grid">
                <div className="gridR">
                  <div className="dx-fieldset">
                    <div className="nameDiv">
                      <div className="dx-field" id="fName">
                        <label>First Name</label>
                        <br />
                        <TextBox
                          className="firstNameTxt"
                          name="fName"
                          showClearButton={true}
                        >
                          <Validator>
                            <RequiredRule message="First Name is required" />
                          </Validator>
                        </TextBox>
                      </div>
                      <div className="dx-field" id="lName">
                        <label>Last Name</label>
                        <br />
                        <TextBox
                          className="lastNameTxt"
                          name="lName"
                          showClearButton={true}
                        >
                          <Validator>
                            <RequiredRule message="Last Name is required" />
                          </Validator>
                        </TextBox>
                      </div>
                    </div>

                    <div className="dx-field">
                      <label>Display Name</label>
                      <br />
                      <TextBox
                        className="nameInitialTxt"
                        name="displayName"
                        showClearButton={true}
                      >
                        <Validator>
                          <RequiredRule message="Display Name is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="nameDiv">
                      <div className="dx-field">
                        <label>Driving Licence Number</label>
                        <br />
                        <TextBox
                          mask="a0000000"
                          name="dLisenseNo"
                          showClearButton={true}
                        />
                      </div>
                      <div className="dx-field">
                        <label>Email</label>
                        <br />
                        <TextBox
                          mask=""
                          className="email"
                          name="email"
                          showClearButton={true}
                        >
                          <Validator>
                            <RequiredRule message="Email is required" />
                            <EmailRule message="Email is invalid" />
                            <AsyncRule
                              message="Email is already registered"
                              // validationCallback={asyncValidation}
                            />
                          </Validator>
                        </TextBox>
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <br />
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
