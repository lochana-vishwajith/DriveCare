import "./trafficOfficerLogin.css";
import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";

export default class trafficOfficerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: "",
    };
  }
  render() {
    return (
      <div className="container">
        <div className="trafficloginmaindiv">
          <div className="trafficloginform">
            <Grid>
              <Paper elevation={20}>
                <h1>aaa</h1>
              </Paper>
            </Grid>
          </div>
          <div className="trafficloginlogo">
            <img src={this.state.logo} />
          </div>
        </div>
      </div>
    );
  }
}
