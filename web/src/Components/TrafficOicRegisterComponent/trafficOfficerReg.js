import "./trfficOfficerReg.css";
import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import DateBox from "devextreme-react/date-box";
import Button from "../ButtonComponent/button";
import { Center } from "devextreme-react/map";

export default class trafficOfficerReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      nameInitial: "",
      dob: "",
      mobile: "",
      home: "",
      nic: "",
      officerReg: "",
    };
  }
  onSubmit = () => {};
  render() {
    return (
      <div className="container">
        <div className="outerDiv">
          <h3>
            <b>Traffic Officer Registration</b>
          </h3>
          <hr />
          <br />
          <Grid>
            <Paper elevation={20}>
              <div className="grid">
                <div className="gridR">
                  <div className="dx-fieldset">
                    <div className="nameDiv">
                      <div className="dx-field" id="firstName">
                        <label>First Name</label>
                        <br />
                        <TextBox
                          className="firstNameTxt"
                          name="firstName"
                          showClearButton={true}
                        />
                      </div>
                      <div className="dx-field" id="lastName">
                        <label>Last Name</label>
                        <br />
                        <TextBox
                          className="lastNameTxt"
                          name="lastName"
                          showClearButton={true}
                        />
                      </div>
                    </div>
                    <div className="dx-field">
                      <label>Name With Initials</label>
                      <br />
                      <TextBox
                        className="nameInitialTxt"
                        name="nameInitial"
                        showClearButton={true}
                      />
                    </div>
                    <div className="dx-field">
                      <label>Date Of Birth</label>
                      <br />
                      <DateBox
                        type="date"
                        className="dob"
                        name="dob"
                        showClearButton={true}
                      />
                    </div>
                    <br />
                    <div className="nameDiv">
                      <div className="dx-field" id="firstName">
                        <label className="mobileLong">Mobile Number</label>
                        <label className="mobileShort">Mobile No</label>
                        <br />
                        <TextBox
                          mask="(000) 000-0000"
                          className="mobile"
                          name="mobile"
                          showClearButton={true}
                        />
                      </div>
                      <div className="dx-field" id="lastName">
                        <label>Home</label>
                        <br />
                        <TextBox
                          mask="(000) 000-0000"
                          className="homeTxt"
                          name="home"
                          showClearButton={true}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="nameDiv">
                      <div className="dx-field" id="firstName">
                        <label>NIC</label>
                        <br />
                        <TextBox
                          className="nic"
                          name="nic"
                          showClearButton={true}
                        />
                      </div>
                      <div className="dx-field" id="lastName">
                        <label className="officerLong">
                          Officer Registration Number
                        </label>
                        <label className="officerShort">Officer No</label>
                        <br />
                        <TextBox
                          mask="0000000000"
                          className="officerReg"
                          name="officerReg"
                          showClearButton={true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gridL">
                  <label className="profilePic">Upload A Profile Picture</label>
                </div>
                <br />
              </div>
              <div>
                <center>
                  <Button
                    id={"officerReg"}
                    value={"Register"}
                    classname={"officerRegBtn"}
                    type={"submit"}
                    onSubmit={this.onSubmit}
                  />
                </center>
              </div>
              <br />
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
