import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Select from "react-select";
import axios from "axios";

export default class createFineUi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diverDetails: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/driver")
      .then((res) => {
        console.log("driver details : ", res.data);
        this.setState({ diverDetails: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="createFineMainDiv">
          <h3>
            <b>Create Fine</b>
          </h3>
          <hr />
          <div className="formDiv">
            <Grid>
              <Paper elevation={20}>
                <div className="fineForm">
                  <form>
                    <br />
                    <label>Driver NIC : </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isLoading={false}
                      isClearable={true}
                      isRtl={false}
                      isSearchable={true}
                      name="color"
                    />
                    <div className="dx-fieldset">
                      <TextBox
                        defaultValue="John Smith"
                        showClearButton={true}
                      />
                    </div>
                  </form>
                </div>
              </Paper>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
