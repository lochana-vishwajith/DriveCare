import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default class DriverSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryDetails: [],
      violation: [],
      minor: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:9000/fine/summary/${localStorage.getItem("DriverID")}`
      )
      .then((res) => {
        console.log("data:", res.data);
        this.setState({ summaryDetails: res.data });
        let tempViolation = [];
        let tempMinor = [];
        this.state.summaryDetails.map((item, index) => {
          item.violationType.map((data, k) => {
            tempMinor.push(item);
            tempViolation.push(data);
          });
        });
        this.setState({ violation: tempViolation });
        this.setState({ minor: tempMinor });
        console.log("VType:", this.state.violation);
        console.log("MType:", this.state.minor);
      });
  }

  generateSummary = () => {
    // e.preventdefault();
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Driver Violation Summary";
    const headers = [["Violation", "Fine Amount"]];
    const head = [["Location", "Type", "Date"]];

    const data = this.state.violation.map(
      (item) => [
        // item.violationType.map((detail) => [
        item.description,
        // item.place,
        // item.fineType,
        item.fineAmount,
        // moment(item.offenceDate).format("DD-MM-YYYY"),
        // ]),
      ],
      this.state.minor.map((item) => [
        item.place,
        item.fineType,
        moment(item.offenceDate).format("DD-MM-YYYY"),
      ])
    );

    // const data2 = this.state.minor.map((item) => [
    //   item.place,
    //   item.fineType,
    //   moment(item.offenceDate).format("DD-MM-YYYY"),
    // ]);

    let contents = {
      starty: 50,
      head: headers,
      body: data,
    };

    doc.setFontSize(20);
    doc.text(title, 300, 60, null, null, "center");
    require("jspdf-autotable");
    doc.autoTable(contents);
    doc.save("Driver_Violation_Summary.pdf");
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <div className="d-flex justify-content-between">
              <label>
                <h2>
                  <b>Tickets Summary</b>
                </h2>
              </label>
              <Link to={`/`}>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm px-4"
                  onClick={this.generateSummary}
                >
                  Download Report
                </button>
              </Link>
            </div>
            <hr />
          </div>
          <Grid>
            <Paper elevation={20} className="p-4">
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
              {this.state.summaryDetails.map((item, key) => (
                <div className="card  border-danger mb-3">
                  <div className="row no-gutters">
                    <div className="col-md-2">
                      <div className="card-body">
                        <p className="card-text">
                          {item.violationType.map((val, k) => val.description)}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="card-body">
                        <p className="card-text">{item.place}</p>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="card-body">
                        <p className="card-text">{item.fineType}</p>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="card-body">
                        <p className="card-text">
                          Rs.
                          {item.violationType.map((val, k) => val.fineAmount)}
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
                          {moment(item.offenceDate).format("DD-MM-YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
