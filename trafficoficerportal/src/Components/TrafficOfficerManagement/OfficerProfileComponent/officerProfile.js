import React, { Component } from "react";
import "./officerProfile.css";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import axios from "axios";
import AuthContext from "../../../Reducer/UseReducer";
import TrafficOfficerLogin from "../TrafficOfficerloginComponent/trafficOfficerLogin";

export default class officerProfile extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      officerDetails: "",
      place: "",
    };
  }
  componentDidMount() {
    const { officerOne } = this.context;
    axios
      .get(`http://localhost:9000/trafficOfficer/officerDetails/${officerOne}`)
      .then((data) => {
        console.log(data.data);
        this.setState({ officerDetails: data.data });
        this.setState({ place: data.data.policeStation });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    const { officerDetails, place } = this.state;
    const { isAutheticated } = this.context;
    return (
      <div>
        {isAutheticated && (
          <div className="container">
            <div className="officerContent">
              <Grid>
                <Paper elevation={20}>
                  <div>
                    <center>
                      <img
                        src={officerDetails.profilePicUrl}
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
                        value={
                          officerDetails.firstName +
                          " " +
                          officerDetails.lastName
                        }
                        className="fineTextBox"
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <lable>Name With Initials : </lable>
                      <TextBox
                        value={officerDetails.nameInitial}
                        className="fineTextBox"
                        readOnly={true}
                      />
                    </div>
                    <div className="leftContent">
                      <lable>Date Of Birth</lable>
                      <TextBox
                        value={officerDetails.dob}
                        className="fineTextBox"
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <lable>NIC</lable>
                      <TextBox
                        value={officerDetails.nic}
                        className="fineTextBox"
                        readOnly={true}
                      />
                    </div>
                    <div className="leftContent">
                      <lable>Mobile Number</lable>
                      <TextBox
                        value={officerDetails.mobile}
                        className="fineTextBox"
                        readOnly={true}
                      />
                    </div>
                    <div>
                      <lable>Registration Number : </lable>
                      <TextBox
                        value={officerDetails.officerReg}
                        className="fineTextBox"
                        readOnly={true}
                      />
                    </div>
                    <div className="leftContent">
                      <lable>Current Working Place : </lable>
                      <TextBox
                        value={place.workstation_Address}
                        className="fineTextBox"
                        readOnly={true}
                      />
                    </div>
                  </div>
                  <br />
                </Paper>
              </Grid>
            </div>
          </div>
        )}
        {!isAutheticated && <TrafficOfficerLogin />}
      </div>
    );
  }
}
