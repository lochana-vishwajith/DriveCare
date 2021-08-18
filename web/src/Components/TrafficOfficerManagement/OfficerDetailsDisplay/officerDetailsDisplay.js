import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import "./officerDetailsDisplay.css";
import axios from "axios";
import "devextreme-react/text-area";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class officerDetailsDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officerDetails: [],
    };
  }

  aaa = () => {
    alert("ss");
  };

  deleteOfficer = (id) => {
    axios
      .delete(`http://localhost:9000/trafficOfficer/${id}`)
      .then((res) => {
        toast.success("Successfully Deleted", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error("Delete Operation Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  componentDidMount() {
    axios.get("http://localhost:9000/trafficOfficer").then((res) => {
      console.log("res : ", res);
      this.setState({ officerDetails: res.data });
    });
  }
  render() {
    const { officerDetails } = this.state;
    return (
      <div className="container">
        <label className="OfficerDetaisDis">
          <h2>
            <b>Traffic Officer Details</b>
          </h2>
        </label>
        <hr />

        <div className="officerdisplayDiv">
          <Grid>
            <Paper elevation={20}>
              <div className="officerDetailsDisplay">
                <table class="table table-striped table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Name With Initials</th>
                      <th scope="col">Date Of Birth</th>
                      <th scope="col">NIC</th>
                      <th scope="col">Officer Registration No</th>
                      <th scope="col">Mobile No</th>
                      <th scope="col">Home No</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {officerDetails.map((officer) => (
                      <tr className="table-light">
                        <td>{officer.firstName}</td>
                        <td>{officer.lastName}</td>
                        <td>{officer.nameInitial}</td>
                        <td>{officer.dob}</td>
                        <td>{officer.nic}</td>
                        <td>{officer.officerReg}</td>
                        <td>{officer.mobile}</td>
                        <td>{officer.home}</td>
                        <td className="btnCol">
                          <i
                            className="far fa-eye fa-lg"
                            onClick={this.aaa}
                            id="offView"
                          />
                          <i className="fas fa-pencil-alt fa-lg" />
                          <i className="fas fa-trash fa-lg" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Paper>
          </Grid>
          <div className="policeCenterDisplay"></div>
        </div>
      </div>
    );
  }
}
