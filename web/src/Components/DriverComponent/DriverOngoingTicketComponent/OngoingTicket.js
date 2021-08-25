import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import "./OngoingTicket.css";
import moment from "moment";

export default class OngoingTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketDetails: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:9000/fine/ongoin/${localStorage.getItem("DriverID")}`
      )
      .then((res) => {
        console.log("data:", res.data);
        this.setState({ ticketDetails: res.data });
      });
  }

  navigateOverview = (id) => {
    window.location = `/ticketOverview/${id}`;
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <label>
              <h2>
                <b>Ongoing Tickets</b>
              </h2>
            </label>
            <hr />
          </div>
          <Grid>
            <Paper elevation={20} className="p-4">
              {this.state.ticketDetails.length != 0 ? (
                <div class="table-responsive">
                  <table class="table table-danger table-striped table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Violation</th>
                        <th scope="col">Location</th>
                        <th scope="col">Fine Amount</th>
                        <th scope="col">Fine Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.ticketDetails.map((item, index) => (
                        <tr
                          key={index}
                          onClick={() => {
                            this.navigateOverview(item._id);
                          }}
                        >
                          <td>
                            {item.violationType.map(
                              (val, k) => val.description
                            )}
                          </td>
                          <td>{item.place}</td>
                          <td>
                            Rs.
                            {item.violationType.map((val, k) => val.fineAmount)}
                            .00
                          </td>
                          <td>
                            {moment(item.offenceDate).format("DD-MM-YYYY")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <center>
                  <h1 class="text-success">
                    No Tickets to show. You Drive Perfectly!
                  </h1>
                </center>
              )}
              <br />
              <div className="mt-5">
                <h1 class="animated-heading">
                  <span class="txt">Always wear a seatbelt</span>
                  <span class="txt">Avoid distractions</span>
                  <span class="txt">Do not cross the speed limits</span>
                  <span class="txt">Follow traffic signals</span>
                  <span class="txt">Maintain lane discipline</span>
                  <span class="txt">Maintain a safe distance</span>
                  <span class="txt">Overtake from the right</span>
                  <span class="txt">Give way for emergency vehicles</span>
                </h1>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
