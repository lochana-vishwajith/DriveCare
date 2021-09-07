import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import "./officerDetailsDisplay.css";
import axios from "axios";
import "devextreme-react/text-area";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import Header from "../../HeaderComponent/header";
import AuthContext from "../../../Reducer/UseReducer";

toast.configure();

export default class officerDetailsDisplay extends Component {
  static contextType = AuthContext;

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
        setTimeout(() => {
          window.location.reload();
        }, 5500);
      })
      .catch((err) => {
        toast.error("Delete Operation Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  componentDidMount() {
    const { stationID } = this.context;

    axios
      .get(`http://localhost:9000/trafficOfficer/${stationID}`)
      .then((res) => {
        console.log("res : ", res);
        this.setState({ officerDetails: res.data });
      });
  }
  render() {
    const { officerDetails } = this.state;
    return (
      <div>
        <Header />
        <div className="container">
          <div className="officerdisplayDiv">
            <Grid>
              <Paper elevation={20}>
                <label className="OfficerDetaisDis">
                  <h2>
                    <b>Traffic Officer Details</b>
                  </h2>
                </label>
                <hr />
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
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {officerDetails.map((officer) => (
                        <tr className="table-light" key={officer._id}>
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
                          </td>
                          <td className="btnCol">
                            <i className="fas fa-pencil-alt fa-lg" />
                          </td>
                          <td className="btnCol">
                            <i
                              className="fas fa-trash fa-lg"
                              onClick={() => this.deleteOfficer(officer._id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Paper>
            </Grid>
            <div className="policeCenterDisplay">
              <center>
                <div
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="station"
                >
                  <label className="stationText">
                    <b>Police Station</b>
                  </label>
                </div>
              </center>
              <center>
                <div
                  className="shadow-lg p-3 mb-5 bg-white rounded"
                  id="station"
                >
                  <label className="stationText">
                    <b>Total Traffic Officers</b>
                  </label>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
