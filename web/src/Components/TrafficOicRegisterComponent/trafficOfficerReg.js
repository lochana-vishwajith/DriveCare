import "./trfficOfficerReg.css";
import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import DateBox from "devextreme-react/date-box";

export default class trafficOfficerReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      nameInitial: "",
      dob: "",
      mobileNumber: "",
    };
  }
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
                  </div>
                </div>
                <div className="gridL">
                  <label className="profilePic">Upload A Profile Picture</label>
                </div>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
