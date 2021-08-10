import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import React, { Component } from "react";

export default class DriverReg extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="d-flex justify-content-center">Driver Registration</h3>

        <Grid>
          <Paper elevation={20}>
            <div className="grid">
              {/* <div className="gridR"> */}
              <div className="dx-fieldset d-flex justify-content-center">
                <div className="dx-field">
                  <label>Full Name</label>
                  <TextBox name="fullName" showClearButton={true} />
                </div>
              </div>
              {/* </div> */}
            </div>
          </Paper>
        </Grid>
      </div>
    );
  }
}
