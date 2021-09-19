import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import moment from "moment";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class DriverSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryDetails: [],
      violation: [],
      minor: [],
    };

    this.generateSummary = this.generateSummary.bind(this);
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
        this.state.summaryDetails.map((item, index) => {
          item.violationType.map((data, k) => {
            const viola = {
              violationType: data.description,
              amount: data.fineAmount,
              location: item.place,
              type: item.fineType,
              date: moment(item.offenceDate).format("DD-MM-YYYY"),
            };
            tempViolation.push(viola);
          });
        });
        this.setState({ violation: tempViolation });
        console.log("VType:", this.state.violation);
      });
  }

  generateSummary() {
    // e.preventdefault();
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF();

    const title = "Driver Violation Summary";
    doc.setFontSize(15);
    doc.setTextColor(128, 0, 0);
    doc.text(title, 100, 10, null, null, "center");
    const headers = [["Violation", "Fine Amount", "Location", "Type", "Date"]];

    const data = this.state.violation.map((item) => [
      item.violationType,
      item.amount,
      item.location,
      item.type,
      item.date,
    ]);
    let contents = {
      startY: 30,
      head: headers,
      body: data,
    };

    doc.setFontSize(20);
    // require("jspdf-autotable");
    doc.autoTable(contents);
    doc.save("Driver_Violation_Summary.pdf");
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
                  <b>Tickets Summary</b>
                </h2>
              </label>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm px-4"
                onClick={this.generateSummary}
              >
                Download Report
              </button>
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
