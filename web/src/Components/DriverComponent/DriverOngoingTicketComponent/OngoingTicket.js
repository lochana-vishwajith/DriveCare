import { Grid, Link, Paper } from "@material-ui/core";
import React, { Component } from "react";
import "./OngoingTicket.css";

export default class OngoingTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketDetails: [],
    };
  }

  componentDidMount() {}
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
              <div>
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
                    <tr>
                      <td>HighSpeeding</td>
                      <td>Battaramulla</td>
                      <td>Rs.1500</td>
                      <td>08/05/2021</td>
                    </tr>
                    <tr>
                      <td>HighSpeeding when overtaikng</td>
                      <td>Rajagiriya</td>
                      <td>Rs.3500</td>
                      <td>10/09/2021</td>
                    </tr>
                  </tbody>
                </table>
                {/* <div className="d-tips">
                  <div class="card text-white bg-success mb-3">
                    <div class="card-body">
                      <h5 class="card-title">Be a Good Driver</h5>
                      <p class="word w1">Look further ahead</p>
                      <p class="word w2">Leave a bigger gap</p>
                      <p class="word w3">Use appropriate speed</p>
                      <p class="word w4">Don’t weave between lanes</p>
                      <p class="word w5">Match your speed to the traffic</p>
                    </div>
                  </div>
                </div> */}
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
