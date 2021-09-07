import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

export default class DriverSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summaryDetails: [],
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
              <Link to={`/`}>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm px-4"
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
