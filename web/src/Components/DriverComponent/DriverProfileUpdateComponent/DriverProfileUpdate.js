import { Grid, Paper } from "@material-ui/core";
import React, { Component } from "react";

export default class DriverProfileUpdate extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <label>
              <h2>
                <b>Update Profile</b>
              </h2>
            </label>
            <hr />
          </div>
          <Grid>
            <Paper elevation={20} className="p-4"></Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
