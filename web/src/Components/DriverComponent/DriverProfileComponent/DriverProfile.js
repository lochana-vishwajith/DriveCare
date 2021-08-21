import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./DriverProfile.css";
import moment from "moment";

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
      .get(`http://localhost:9000/driver/${this.props.match.params.id}`)
      .then((result) => {
        console.log("Data:", result.data);
        this.setState({ driverDetails: result.data });
        console.log(this.state.driverDetails);
      })
      .catch((error) => {
        console.log("Data not Retriewed", error);
      });
  }
  render() {
    const { driverDetails } = this.state;
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <label>
              <h2>
                <b>User Profile</b>
              </h2>
            </label>
            <Link to={`/driverProfileUpdate/${this.props.match.params.id}`}>
              <button type="button" class="btn btn-outline-danger btn-sm px-4">
                Edit
              </button>
            </Link>
            <hr />
            <Grid>
              <Paper elevation={20} className="p-4">
                <div className="d-dispaly-web">
                  {driverDetails.map((item, index) => (
                    <div className="d-grid" key={index}>
                      <div className="border rounded border-danger p-3">
                        <label>
                          <h3>Basic Info</h3>
                        </label>
                        <div className="ml-2">
                          <label>Full name</label>
                          <br />
                          <b>
                            {item.firstName} {item.lastName}
                          </b>
                          <br />
                          <label>Display name</label>
                          <br />
                          <b>{item.displayName}</b>
                          <br />
                          <label>Driving Licence Number</label>
                          <br />
                          <b>{item.licenceNumber}</b>
                          <br />
                          <label>NIC Number</label>
                          <br />
                          <b>{item.NIC}</b>
                          <br />
                          <label>Date of Birth</label>
                          <br />
                          <b>{moment(item.dob).format("MMMM Do YYYY")}</b>
                        </div>
                      </div>
                      <div className="border rounded border-danger p-3">
                        <label>
                          <h3>Contact Info</h3>
                        </label>
                        <div className="ml-2">
                          <label>Email</label>
                          <br />
                          <b>{item.email}</b>
                          <br />
                          <label>Mobile</label>
                          <br />
                          <b>{item.mobile}</b>
                          <br />
                          <label>Address</label>
                          <br />
                          <b>{item.address}</b>
                          <hr />
                          <label>
                            <h3>Licence Status</h3>
                          </label>
                          <div className="ml-2">
                            <label>Status</label>
                            <br />
                            {item.licenceStatus == "Active" && (
                              <b className="d-btn-active">
                                {item.licenceStatus}
                              </b>
                            )}
                            {item.licenceStatus == "Pending" && (
                              <b className="d-btn-pending">
                                {item.licenceStatus}
                              </b>
                            )}
                            {item.licenceStatus == "Cancelled" && (
                              <b className="d-btn-Cancelled">
                                {item.licenceStatus}
                              </b>
                            )}
                            <br />
                            <label>Expiry Date</label>
                            <br />
                            <b>
                              {moment(item.licenceExpiryDate).format(
                                "MMMM Do YYYY"
                              )}
                            </b>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded border-danger p-3">
                        <center>
                          {this.state.profilePicURL ? (
                            <img
                              src={this.state.profilePicURL}
                              class="w-100 shadow-1-strong rounded mb-4"
                              id="profilePic"
                              alt=""
                            />
                          ) : (
                            <img
                              src={this.state.image}
                              class="w-100 shadow-1-strong rounded mb-4"
                              id="profilePic"
                              alt=""
                            />
                          )}
                        </center>
                        <hr />
                        <div className="border rounded border border-success p-1">
                          <center>
                            <label>My Points</label>
                            <br />
                            {item.points >= 20 && (
                              <b className="d-points-g">{item.points}</b>
                            )}
                            {item.points >= 10 && item.points < 20 && (
                              <b className="d-points-y">{item.points}</b>
                            )}
                            {item.points < 10 && (
                              <b className="d-points-r">{item.points}</b>
                            )}
                            <br />
                            <label>Out of 30</label>
                          </center>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {driverDetails.map((item, index) => (
                  <div className="d-grid-responsive" key={index}>
                    <div className="border rounded border-danger p-3 ml-1">
                      <center>
                        {this.state.profilePicURL ? (
                          <img
                            src={this.state.profilePicURL}
                            class="w-100 shadow-1-strong rounded mb-4"
                            id="profilePic"
                            alt=""
                          />
                        ) : (
                          <img
                            src={this.state.image}
                            class="w-100 shadow-1-strong rounded mb-4"
                            id="profilePic"
                            alt=""
                          />
                        )}
                      </center>
                      <hr />
                      <div className="border rounded border-danger p-1">
                        <center>
                          <label>My Points</label>
                          <br />
                          {item.points >= 20 && (
                            <b className="d-points-g">{item.points}</b>
                          )}
                          {item.points >= 10 && item.points < 20 && (
                            <b className="d-points-y">{item.points}</b>
                          )}
                          {item.points < 10 && (
                            <b className="d-points-r">{item.points}</b>
                          )}
                          <br />
                          <label>Out of 30</label>
                        </center>
                      </div>
                    </div>
                    <br />
                    <div className="border rounded border-danger p-3">
                      <label>
                        <h3>Basic Info</h3>
                      </label>
                      <div className="ml-2">
                        <label>Full name</label>
                        <br />
                        <b>
                          {item.firstName} {item.lastName}
                        </b>
                        <br />
                        <label>Display name</label>
                        <br />
                        <b>{item.displayName}</b>
                        <br />
                        <label>Driving Licence Number</label>
                        <br />
                        <b>{item.licenceNumber}</b>
                        <br />
                        <label>NIC Number</label>
                        <br />
                        <b>{item.NIC}</b>
                        <br />
                        <label>Date of Birth</label>
                        <br />
                        <b>{moment(item.dob).format("MMMM Do YYYY")}</b>
                      </div>
                    </div>
                    <br />
                    <div className="border rounded border-danger p-3 ml-1">
                      <label>
                        <h3>Contact Info</h3>
                      </label>
                      <div className="ml-2">
                        <label>Email</label>
                        <br />
                        <b>{item.email}</b>
                        <br />
                        <label>Mobile</label>
                        <br />
                        <b>{item.mobile}</b>
                        <br />
                        <label>Address</label>
                        <br />
                        <b>{item.address}</b>
                        <hr />
                        <label>
                          <h3>Licence Status</h3>
                        </label>
                        <div className="ml-2">
                          <label>Status</label>
                          <br />
                          {item.licenceStatus == "Active" && (
                            <b className="d-btn-active">{item.licenceStatus}</b>
                          )}
                          {item.licenceStatus == "Pending" && (
                            <b className="d-btn-pending">
                              {item.licenceStatus}
                            </b>
                          )}
                          {item.licenceStatus == "Cancelled" && (
                            <b className="d-btn-Cancelled">
                              {item.licenceStatus}
                            </b>
                          )}
                          <br />
                          <label>Expiry Date</label>
                          <br />
                          <b>
                            {moment(item.licenceExpiryDate).format(
                              "MMMM Do YYYY"
                            )}
                          </b>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Paper>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
