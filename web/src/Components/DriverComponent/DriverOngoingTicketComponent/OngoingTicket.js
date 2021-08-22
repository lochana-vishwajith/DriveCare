import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import "./OngoingTicket.css";

export default class OngoingTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketDetails: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/fine/ongoin/61212c0b8ee90a553c456da4`)
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
                        this.navigateOverview = item._id;
                      }}
                    >
                      <td>
                        {item.violationType.map((val, k) => val.description)}
                      </td>
                      <td>{item.place}</td>
                      <td>
                        {item.violationType.map((val, k) => val.fineAmount)}
                      </td>
                      <td>{item.offenceDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
