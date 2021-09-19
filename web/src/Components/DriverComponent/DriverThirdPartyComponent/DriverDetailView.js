import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import "./DriverDetailView.css";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class DriverDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      driverID: this.props.match.params.id,
      image:
        "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628183905292_pngwing.com.png?alt=media&token=0f85489d-8c99-4f2b-9d0e-1144b64c733d",
      driverDetails: [],
      summaryDetails: [],
      fines: [],
      userData: [],
    };

    this.generateViolationReport = this.generateViolationReport.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/driver/driverdetails/${this.state.driverID}`)
      .then((result) => {
        console.log("Data:", result.data);
        this.setState({ driverDetails: result.data });
        console.log("driver details", this.state.driverDetails);

        this.state.driverDetails.map((item, index) => {
          item.fines.map((i, k) => {
            this.setState({ fines: i });
          });
        });
        console.log("fine details", this.state.fines);
        this.generateData();
      })
      .catch((error) => {
        console.log("Data not Retriewed", error);
      });

    axios
      .get(
        `http://localhost:9000/fine/thirdpartyDetails/${this.props.match.params.id}`
      )
      .then((res) => {
        console.log("data:", res);
        this.setState({ summaryDetails: res.data });
        console.log("summary details", this.state.summaryDetails);
      })
      .catch((error) => {
        console.log("Data not Retriewed", error);
      });
  }

  generateData = () => {
    let userDetails = [];
    this.state.driverDetails.map((item) => {
      item.fines.map((fine) => {
        fine.violationType.map((violation) => {
          const dataSet = {
            name: item.firstName + " " + item.lastName,
            nic: item.NIC,
            address: item.address,
            licenseNo: item.licenceNumber,
            exdate: moment(item.licenceExpiryDate).format("DD-MM-YYYY"),
            points: item.points,
            photo: item.profilePicURL,
            violationType: violation.description,
            amount: violation.fineAmount,
            location: fine.place,
            type: fine.fineType,
            date: moment(fine.offenceDate).format("DD-MM-YYYY"),
          };
          userDetails.push(dataSet);
        });
      });
    });

    this.setState({ userData: userDetails });
    console.log("USER DATA:", this.state.userData);
  };

  generateViolationReport() {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
    // orientation, unit, size
    const doc = new jsPDF();

    const title = "Driver Violation Report";
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, "center");
    doc.addImage(`${this.state.userData[0].photo}`, "JPEG", 20, 30, 80, 80);
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text(`Full Name: ${this.state.userData[0].name}`, 20, 30, null, null);
    doc.text(`Address: ${this.state.userData[0].address}`, 120, 30, null, null);
    doc.text(`NIC: ${this.state.userData[0].nic}`, 20, 40, null, null);
    doc.text(
      `Driving License Number: ${this.state.userData[0].licenseNo}`,
      120,
      40,
      null,
      null
    );
    doc.text(`Points: ${this.state.userData[0].points}/30`, 20, 50, null, null);
    doc.text(
      `License Expiry Date: ${this.state.userData[0].exdate}`,
      120,
      50,
      null,
      null
    );
    const headers = [["Violation", "Fine Amount", "Location", "Type", "Date"]];

    const data = this.state.userData.map((item) => [
      item.violationType,
      item.amount,
      item.location,
      item.type,
      item.date,
    ]);
    let contents = {
      startY: 80,
      head: headers,
      body: data,
    };

    // doc.setFontSize(20);
    // require("jspdf-autotable");
    doc.autoTable(contents);
    doc.save("Driver_Violation_Report.pdf");
    toast.success("Report Downloaded.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <label>
                <h2>
                  <b>Violation History</b>
                </h2>
              </label>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm px-4"
                onClick={this.generateViolationReport}
              >
                Download Report
              </button>
            </div>
            <hr />
          </div>
          <Grid>
            <Paper elevation={20} className="p-4">
              <div className="tp-web-d">
                <div className="border p-5 mb-5">
                  {this.state.driverDetails.map((item, index) => (
                    <div className="d-grid-tp">
                      <div>
                        {item.profilePicURL ? (
                          <img src={item.profilePicURL} className="d-img-tp" />
                        ) : (
                          <img src={this.state.image} className="d-img-tp" />
                        )}
                      </div>
                      <div className="mt-3">
                        <label>Full Name</label>
                        <br />
                        <b>{item.firstName + " " + item.lastName}</b>
                        <br />
                        <br />
                        <label>NIC Number</label>
                        <br />
                        <b>{item.NIC}</b>
                        <br />
                        <br />
                        <label>Points</label>
                        <br />
                        {item.points >= 20 && (
                          <b className="d-points-g-tp">{item.points}/30</b>
                        )}
                        {item.points >= 10 && item.points < 20 && (
                          <b className="d-points-y-tp">{item.points}/30</b>
                        )}
                        {item.points < 10 && (
                          <b className="d-points-r-tp">{item.points}/30</b>
                        )}
                      </div>
                      <div className="mt-3">
                        <label>Address</label>
                        <br />
                        <b>{item.address}</b>
                        <br />
                        <br />
                        <label>Driving License Number</label>
                        <br />
                        <b>{item.licenceNumber}</b>
                        <br />
                        <br />
                        <label>License Expiry Date</label>
                        <br />
                        <b>
                          {moment(item.licenceExpiryDate).format("DD-MM-YYYY")}
                        </b>
                      </div>
                    </div>
                  ))}
                  <br />
                </div>
                <div>
                  <h3 className="mb-4">Past Violations</h3>
                  {this.state.fines.length == 0 ? (
                    <center>
                      <h1 className="text-success">
                        <b>No Past Violations, Decent Driver</b>
                      </h1>
                    </center>
                  ) : (
                    <div>
                      <div class="container">
                        <div class="row">
                          <div class="col">
                            <b>Violation</b>
                          </div>
                          <div class="col">
                            <b>Location</b>
                          </div>
                          <div class="col">
                            <b>Type</b>
                          </div>
                          <div class="col">
                            <b>Fine</b>
                          </div>
                          <div class="col">
                            <b>Police Station</b>
                          </div>
                          <div class="col">
                            <b>Date</b>
                          </div>
                        </div>
                      </div>
                      <hr />
                      {this.state.driverDetails.map((f, index) =>
                        f.fines.map((i, k) => (
                          <div className="card  border-danger mb-3">
                            <div className="row no-gutters">
                              <div className="col-md-2">
                                <div className="card-body">
                                  <p className="card-text">
                                    {i.violationType.map(
                                      (v, j) => v.description
                                    )}
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="card-body">
                                  <p className="card-text">{i.place}</p>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="card-body">
                                  <p className="card-text">{i.fineType}</p>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="card-body">
                                  <p className="card-text">
                                    Rs.
                                    {i.violationType.map(
                                      (v, j) => v.fineAmount
                                    )}
                                    .00
                                  </p>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="card-body">
                                  <p className="card-text">Kaduwela</p>
                                </div>
                              </div>
                              <div className="col-md-2">
                                <div className="card-body">
                                  <p className="card-text">
                                    {moment(i.offenceDate).format("DD-MM-YYYY")}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="d-tp-responsive">
                <div className="border rounded border-danger p-3">
                  <div>
                    {this.state.driverDetails.map((item, index) => (
                      <div>
                        <center>
                          {item.profilePicURL ? (
                            <img
                              src={item.profilePicURL}
                              className="d-img-tp"
                            />
                          ) : (
                            <img src={this.state.image} className="d-img-tp" />
                          )}
                        </center>
                        <div>
                          <label>Full Name</label>
                          <br />
                          <b>{item.firstName + " " + item.lastName}</b>
                          <br />
                          <br />
                          <label>NIC Number</label>
                          <br />
                          <b>{item.NIC}</b>
                          <br />
                          <br />
                          <label>Points</label>
                          <br />
                          {item.points >= 20 && (
                            <b className="d-points-g-tp">{item.points}/30</b>
                          )}
                          {item.points >= 10 && item.points < 20 && (
                            <b className="d-points-y-tp">{item.points}/30</b>
                          )}
                          {item.points < 10 && (
                            <b className="d-points-r-tp">{item.points}/30</b>
                          )}
                          <br />
                          <br />
                          <label>Address</label>
                          <br />
                          <b>{item.address}</b>
                          <br />
                          <br />
                          <label>Driving License Number</label>
                          <br />
                          <b>{item.licenceNumber}</b>
                          <br />
                          <br />
                          <label>License Expiry Date</label>
                          <br />
                          <b>
                            {moment(item.licenceExpiryDate).format(
                              "DD-MM-YYYY"
                            )}
                          </b>
                        </div>
                      </div>
                    ))}
                    <br />
                  </div>
                </div>
                <br />
                <div className="border rounded border-danger p-3">
                  <div>
                    <h3 className="mb-4">Past Violations</h3>
                    {this.state.fines.length == 0 ? (
                      <center>
                        <h1 className="text-success">
                          <b>No Past Violations, Decent Driver</b>
                        </h1>
                      </center>
                    ) : (
                      <div>
                        <div class="container">
                          <div class="row">
                            <div class="col">
                              <b>Violation</b>
                            </div>
                            <div class="col">
                              <b>Location</b>
                            </div>
                            <div class="col">
                              <b>Type</b>
                            </div>
                            <div class="col">
                              <b>Fine</b>
                            </div>
                            <div class="col">
                              <b>Police Station</b>
                            </div>
                            <div class="col">
                              <b>Date</b>
                            </div>
                          </div>
                        </div>
                        <hr />
                        {this.state.driverDetails.map((f, index) =>
                          f.fines.map((i, k) => (
                            <div className="card  border-danger mb-3">
                              <div className="row no-gutters">
                                <div className="col-md-2">
                                  <div className="card-body">
                                    <p className="card-text">
                                      {i.violationType.map(
                                        (v, j) => v.description
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="card-body">
                                    <p className="card-text">{i.place}</p>
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="card-body">
                                    <p className="card-text">{i.fineType}</p>
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="card-body">
                                    <p className="card-text">
                                      Rs.
                                      {i.violationType.map(
                                        (v, j) => v.fineAmount
                                      )}
                                      .00
                                    </p>
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="card-body">
                                    <p className="card-text">Kaduwela</p>
                                  </div>
                                </div>
                                <div className="col-md-2">
                                  <div className="card-body">
                                    <p className="card-text">
                                      {moment(i.offenceDate).format(
                                        "DD-MM-YYYY"
                                      )}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
