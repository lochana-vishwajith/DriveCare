import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import "./DriverProfile.css";

export default class DriverProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverDetails: [],
      image:
        "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628183905292_pngwing.com.png?alt=media&token=0f85489d-8c99-4f2b-9d0e-1144b64c733d",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/driver/B1234567")
      .then((result) => {
        console.log("Data:", result.data);
        this.setState({ driverDetails: result.data });
        console.log(this.state.driverDetails[0]);
      })
      .catch((error) => {
        console.log("Data not Retriewed", error);
      });
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <label>
              <h2>
                <b>User Profile</b>
              </h2>
            </label>
            <hr />
            <Grid>
              <Paper elevation={20} className="p-4">
                <div className="d-dispaly-web">
                  <div className="d-grid">
                    <div className="border rounded p-3">
                      <label>
                        <h3>Basic Info</h3>
                      </label>
                      <div className="ml-2">
                        <label>Full name</label>
                        <br />
                        <b>Savi Rana</b>
                        <br />
                        <label>Display name</label>
                        <br />
                        <b>Saviya98</b>
                        <br />
                        <label>Driving Licence Number</label>
                        <br />
                        <b>B1254896</b>
                        <br />
                        <label>NIC Number</label>
                        <br />
                        <b>980956984V</b>
                        <br />
                        <label>Date of Birth</label>
                        <br />
                        <b>08th April 1998</b>
                      </div>
                    </div>
                    <div className="border rounded p-3 ml-1">
                      <label>
                        <h3>Contact Info</h3>
                      </label>
                      <div className="ml-2">
                        <label>Email</label>
                        <br />
                        <b>Saviya@gmail.com</b>
                        <br />
                        <label>Mobile</label>
                        <br />
                        <b>076985421</b>
                        <br />
                        <label>Address</label>
                        <br />
                        <b>51, Kingswood Rd, Malabe.</b>
                        <hr />
                        <label>
                          <h3>Licence Status</h3>
                        </label>
                        <div className="ml-2">
                          <label>Status</label>
                          <br />
                          <b>Available</b>
                          <br />
                          <label>Expiry Date</label>
                          <br />
                          <b>22th July 2028</b>
                        </div>
                      </div>
                    </div>
                    <div className="border rounded p-3 ml-1">
                      <center>
                        <img
                          src={this.state.image}
                          class="w-100 shadow-1-strong rounded mb-4"
                          id="profilePic"
                          alt=""
                        />
                      </center>
                      <hr />
                      <div className="border rounded p-1">
                        <center>
                          <label>My Points</label>
                          <br />
                          <b className="d-points">25</b>
                          <br />
                          <label>Out of 30</label>
                        </center>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-grid-responsive">
                  <div className="border rounded p-3 ml-1">
                    <center>
                      <img
                        src={this.state.image}
                        class="w-100 shadow-1-strong rounded mb-4"
                        id="profilePic"
                        alt=""
                      />
                    </center>
                    <hr />
                    <div className="border rounded p-1">
                      <center>
                        <label>My Points</label>
                        <br />
                        <b className="d-points">25</b>
                        <br />
                        <label>Out of 30</label>
                      </center>
                    </div>
                  </div>
                  <br />
                  <div className="border rounded p-3">
                    <label>
                      <h3>Basic Info</h3>
                    </label>
                    <div className="ml-2">
                      <label>Full name</label>
                      <br />
                      <b>Savi Rana</b>
                      <br />
                      <label>Display name</label>
                      <br />
                      <b>Saviya98</b>
                      <br />
                      <label>Driving Licence Number</label>
                      <br />
                      <b>B1254896</b>
                      <br />
                      <label>NIC Number</label>
                      <br />
                      <b>980956984V</b>
                      <br />
                      <label>Date of Birth</label>
                      <br />
                      <b>08th April 1998</b>
                    </div>
                  </div>
                  <br />
                  <div className="border rounded p-3 ml-1">
                    <label>
                      <h3>Contact Info</h3>
                    </label>
                    <div className="ml-2">
                      <label>Email</label>
                      <br />
                      <b>Saviya@gmail.com</b>
                      <br />
                      <label>Mobile</label>
                      <br />
                      <b>076985421</b>
                      <br />
                      <label>Address</label>
                      <br />
                      <b>51, Kingswood Rd, Malabe.</b>
                      <hr />
                      <label>
                        <h3>Licence Status</h3>
                      </label>
                      <div className="ml-2">
                        <label>Status</label>
                        <br />
                        <b>Available</b>
                        <br />
                        <label>Expiry Date</label>
                        <br />
                        <b>22th July 2028</b>
                      </div>
                    </div>
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
