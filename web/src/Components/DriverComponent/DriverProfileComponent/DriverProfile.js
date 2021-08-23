import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./DriverProfile.css";
import DriverHeader from "../DriverHeaderComponent/DriverHeader";
import DriverFooter from "../DriverFooterComponent/DriverFooter";

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
    const id = localStorage.getItem("DriverID");
    axios
      .get(`http://localhost:9000/driver/${id}`)
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
        <div>
          <DriverHeader />
        </div>
        <div className="container">
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <label>
                <h2>
                  <b>User Profile</b>
                </h2>
              </label>
              <Link to={`/driverProfileUpdate/${this.props.match.params.id}`}>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm px-4"
                >
                  Edit
                </button>
              </Link>
            </div>
            <hr />
            <Grid>
              <Paper elevation={20} className="p-3">
                <div className="d-dispaly-web-d">
                  {driverDetails.map((item, index) => (
                    <div className="d-grid-d" key={index}>
                      <div className="border rounded border-danger p-3 d-grid-clr">
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
                      <div className="border rounded border-danger p-3 d-grid-clr">
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
                              <b className="d-btn-active-d">
                                {item.licenceStatus}
                              </b>
                            )}
                            {item.licenceStatus == "Pending" && (
                              <b className="d-btn-pending-d">
                                {item.licenceStatus}
                              </b>
                            )}
                            {item.licenceStatus == "Cancelled" && (
                              <b className="d-btn-Cancelled-d">
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
                      <div className="border rounded border-danger p-3 d-grid-clr">
                        <center>
                          {!item.profilePicURL ? (
                            <img src={this.state.image} class="img" alt="" />
                          ) : (
                            <img src={item.profilePicURL} class="img" alt="" />
                          )}
                        </center>
                        <hr />
                        <div className="border rounded border border-success p-1">
                          <center>
                            <label>My Points</label>
                            <br />
                            {item.points >= 20 && (
                              <b className="d-points-g-d">{item.points}</b>
                            )}
                            {item.points >= 10 && item.points < 20 && (
                              <b className="d-points-y-d">{item.points}</b>
                            )}
                            {item.points < 10 && (
                              <b className="d-points-r-d">{item.points}</b>
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
                  <div className="d-grid-responsive-d" key={index}>
                    <div className="border rounded border-danger p-3 ml-1 d-grid-clr">
                      <center>
                        {item.profilePicURL ? (
                          <img src={item.profilePicURL} class="img" alt="" />
                        ) : (
                          <img src={this.state.image} class="img" alt="" />
                        )}
                      </center>
                      <hr />
                      <div className="border rounded border-danger p-1">
                        <center>
                          <label>My Points</label>
                          <br />
                          {item.points >= 20 && (
                            <b className="d-points-g-d">{item.points}</b>
                          )}
                          {item.points >= 10 && item.points < 20 && (
                            <b className="d-points-y-d">{item.points}</b>
                          )}
                          {item.points < 10 && (
                            <b className="d-points-r-d">{item.points}</b>
                          )}
                          <br />
                          <label>Out of 30</label>
                        </center>
                      </div>
                    </div>
                    <br />
                    <div className="border rounded border-danger p-3 d-grid-clr">
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
                    <div className="border rounded border-danger p-3 ml-1 d-grid-clr">
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
                            <b className="d-btn-active-d">
                              {item.licenceStatus}
                            </b>
                          )}
                          {item.licenceStatus == "Pending" && (
                            <b className="d-btn-pending-d">
                              {item.licenceStatus}
                            </b>
                          )}
                          {item.licenceStatus == "Cancelled" && (
                            <b className="d-btn-Cancelled-d">
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
        <div>
          <DriverFooter />
        </div>
      </div>
    );
  }
}
