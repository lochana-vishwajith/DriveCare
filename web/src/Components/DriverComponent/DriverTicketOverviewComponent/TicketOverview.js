import { Grid, Paper } from "@material-ui/core";
import React, { Component } from "react";
import "./TicketOverview.css";

export default class TicketOverview extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <label>
              <h2>
                <b>Ticket Overview</b>
              </h2>
            </label>
            <hr />
          </div>
          <Grid>
            <Paper elevation={20} className="p-4">
              <div className="d-ticekt-grid">
                <div className="border rounded  border-danger p-3">
                  <label>
                    <h3>Violation Details</h3>
                  </label>
                  <div className="ml-2">
                    <label>Violation : </label>
                    <b> Speeding</b>
                    <br />
                    <label>Location : </label>
                    <b> Malabe</b>
                    <br />
                    <label>Description : </label>
                    <b> Speed is over 120 kmph on the main road.</b>
                    <br />
                    <label>Fine : </label>
                    <b> Rs.1500.00</b>
                    <br />
                    <label>Court Date : </label>
                    <b> 25/09/2021</b>
                    <br />
                  </div>
                </div>
                <div className="border rounded  border-danger p-3">
                  <label>
                    <h3>Officer Details</h3>
                  </label>
                </div>
              </div>
              <div className="d-comment-grid">
                <div className="border rounded  border-danger p-3">
                  <label className="d-flex justify-content-between">
                    <h3>Comments</h3>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm px-4"
                    >
                      Add
                    </button>
                  </label>
                </div>
                <div className="border rounded  border-danger p-3">
                <label className="d-flex justify-content-between">
                    <h3>Evidance</h3>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm px-4"
                    >
                      Add
                    </button>
                  </label>
                </div>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
