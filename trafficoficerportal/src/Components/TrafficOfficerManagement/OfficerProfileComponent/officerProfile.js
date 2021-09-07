import React, { Component } from "react";
import "./officerProfile.css";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";

export default class officerProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      Initials: "",
      dob: "",
      nic: "",
      mobile: "",
      reg: "",
      place: "",
    };
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="officerContent">
            <Grid>
              <Paper elevation={20}>
                <div>
                  <center>
                    <img
                      src={
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFJdHCMZ72UWcpaa_XkGXe_-LtCQXua3pwLQ&usqp=CAU"
                      }
                      className="w-100 shadow-1-strong rounded mb-4"
                      id="officerProPic"
                      alt=""
                    />
                  </center>
                </div>
                <lable className="OfficerDetails">
                  <b>Personal Details</b>
                </lable>
                <hr className="officerDetailHr" />
                <div className="detailsDiv">
                  <div className="leftContent">
                    <lable>Full Name : </lable>
                    <TextBox
                      value={this.state.fullName}
                      className="fineTextBox"
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <lable>Name With Initials : </lable>
                    <TextBox
                      value={this.state.Initials}
                      className="fineTextBox"
                      readOnly={true}
                    />
                  </div>
                  <div className="leftContent">
                    <lable>Date Of Birth</lable>
                    <TextBox
                      value={this.state.dob}
                      className="fineTextBox"
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <lable>NIC</lable>
                    <TextBox
                      value={this.state.nic}
                      className="fineTextBox"
                      readOnly={true}
                    />
                  </div>
                  <div className="leftContent">
                    <lable>Mobile Number</lable>
                    <TextBox
                      value={this.state.mobile}
                      className="fineTextBox"
                      readOnly={true}
                    />
                  </div>
                  <div>
                    <lable>Registration Number : </lable>
                    <TextBox
                      value={this.state.reg}
                      className="fineTextBox"
                      readOnly={true}
                    />
                  </div>
                  <div className="leftContent">
                    <lable>Current Working Place : </lable>
                    <TextBox
                      value={this.state.place}
                      className="fineTextBox"
                      readOnly={true}
                    />
                  </div>
                </div>
              </Paper>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
