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
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import TextBox from "devextreme-react/text-box";
import moment from "moment";

toast.configure();

export default class officerDetailsDisplay extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      officerDetails: [],
      editpopupVisible: false,
      viewpopupVisible: false,
      positionOf: "",
      officer: "",
      nic: "",
      home: "",
      mobile: "",
      name: "",
      id: "",
      totalOfficers: "",
      workingPlace: "",
    };
  }

  handleCloseView = () => {
    this.setState({ viewpopupVisible: false });
  };
  handleCloseEdit = () => {
    this.setState({ editpopupVisible: false });
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
        this.setState({ totalOfficers: res.data.length });
      });
  }
  getOfficerDetailsById = (id) => {
    axios
      .get(`http://localhost:9000/trafficOfficer/officerDetails/${id}`)
      .then((res) => {
        this.setState({ officer: res.data });
        this.setState({ mobile: res.data.mobile });
        this.setState({ home: res.data.home });
        this.setState({ id: res.data._id });
        this.setState({ name: res.data.nameInitial });
        this.setState({ workingPlace: res.data.policeStation });
        this.setState({
          nic: res.data.nic,
        });
        console.log("edit details : ", res.data);
        console.log("place", this.state.workingPlace);
      });
  };
  viewDetails = async (id) => {
    await this.getOfficerDetailsById(id);
    this.setState({ viewpopupVisible: true });
  };

  editDetails = async (id) => {
    await this.getOfficerDetailsById(id);
    this.setState({ editpopupVisible: true });
  };

  saveEditedDetails = () => {
    const { name, mobile, home, nic, id } = this.state;
    console.log("home : ", this.state.home);
    const details = {
      nameInitial: name,
      mobile,
      home,
      nic,
    };
    console.log("details : ", details);
    axios
      .put(`http://localhost:9000/trafficOfficer/updateDetails/${id}`, details)
      .then((res) => {
        console.log("res : ", res);
        toast.success("Successfully Updated", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Update Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };
  NameChanged = (e) => {
    this.setState({ name: e.value });
  };
  mobileChanged = (e) => {
    this.setState({ mobile: e.value });
  };
  homeChanged = (e) => {
    this.setState({ home: e.value });
  };
  nicChanged = (e) => {
    this.setState({ nic: e.value });
  };
  render() {
    const { officerDetails, officer, id, totalOfficers, workingPlace } =
      this.state;
    return (
      <div>
        <Popup
          visible={this.state.editpopupVisible}
          onHiding={this.handleCloseEdit}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showCloseButton={true}
          showTitle={true}
          title="Edit Officer Details"
          container=".dx-viewport"
          width={550}
          height={500}
        >
          <Position at="center" my="center" of={this.state.positionOf} />
          <div className="editPopup">
            <div className="dx-fieldset">
              <div className="popupProPic">
                <img
                  src={officer.profilePicUrl}
                  className="w-100 shadow-1-strong rounded mb-4"
                  id="officerProPicPop"
                  alt=""
                />
                <label className="OfficerPopName">
                  {officer.firstName + " " + officer.lastName}
                </label>
              </div>
              <hr className="pophr" />
              <div className="popupProPic">
                <div id="txtDiv">
                  <label>Name With Initials</label>
                  <br />
                  <TextBox
                    value={this.state.name}
                    className="fineTextBox"
                    onValueChanged={this.NameChanged}
                  />
                </div>
                <div id="txtDiv">
                  <label>Mobile Number</label>
                  <br />
                  <TextBox
                    value={this.state.mobile}
                    className="fineTextBox"
                    onValueChanged={this.mobileChanged}
                  />
                </div>
                <div id="txtDiv">
                  <label>Home Number</label>
                  <br />
                  <TextBox
                    value={this.state.home}
                    className="fineTextBox"
                    onValueChanged={this.homeChanged}
                  />
                </div>
                <div id="txtDiv">
                  <label>NIC</label>
                  <br />
                  <TextBox
                    value={this.state.nic}
                    className="fineTextBox"
                    onValueChanged={this.nicChanged}
                  />
                </div>
              </div>
              <br />
              <center>
                <button
                  type="button"
                  class="btn btn-warning"
                  onClick={() => this.saveEditedDetails(id)}
                >
                  Save Changes
                </button>
              </center>
            </div>
          </div>
        </Popup>
        <Popup
          visible={this.state.viewpopupVisible}
          onHiding={this.handleCloseView}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showCloseButton={true}
          showTitle={true}
          title="Display Officer Details"
          container=".dx-viewport"
          width={550}
          height={500}
        >
          <Position at="center" my="center" of={this.state.positionOf} />
          <div className="popupProPic">
            <img
              src={officer.profilePicUrl}
              className="w-100 shadow-1-strong rounded mb-4"
              id="officerProPicPop"
              alt=""
            />
            <label className="OfficerPopName">
              {officer.firstName + " " + officer.lastName}
            </label>
          </div>
          <hr className="pophr" />
          <div className="popupProPic">
            <div id="txtDiv">
              <label>Name With Initials</label>
              <br />
              <TextBox
                value={officer.nameInitial}
                className="fineTextBox"
                readOnly
              />
            </div>
            <div id="txtDiv">
              <label>Date Of Birth</label>
              <br />
              <TextBox
                value={moment(officer.dob).format("YYYY-MM-DD")}
                className="fineTextBox"
                readOnly
              />
            </div>
            <div id="txtDiv">
              <label>Registartion Number</label>
              <br />
              <TextBox
                value={officer.officerReg}
                className="fineTextBox"
                readOnly
              />
            </div>
            <div id="txtDiv">
              <label>Mobile Number</label>
              <br />
              <TextBox
                value={officer.mobile}
                className="fineTextBox"
                readOnly
              />
            </div>
            <div id="txtDiv">
              <label>Home Number</label>
              <br />
              <TextBox value={officer.home} className="fineTextBox" readOnly />
            </div>
            <div id="txtDiv">
              <label>NIC</label>
              <br />
              <TextBox value={officer.nic} className="fineTextBox" readOnly />
            </div>
            <div id="txtDiv">
              <label>Working Police Station</label>
              <br />
              <TextBox
                value={workingPlace.workstation_Address}
                className="fineTextBox"
                readOnly
              />
            </div>
            <div id="txtDiv">
              <label>Remaining Points</label>
              <br />
              <TextBox
                value={officer.points}
                className="fineTextBox"
                readOnly
              />
            </div>

            <br />
          </div>
        </Popup>
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
                              onClick={() => this.viewDetails(officer._id)}
                              id="offView"
                            />
                          </td>
                          <td className="btnCol">
                            <i
                              className="fas fa-pencil-alt fa-lg"
                              onClick={() => this.editDetails(officer._id)}
                            />
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
                    <b>Total Traffic Officers</b>
                  </label>
                  <p className="count">
                    <b>{totalOfficers}</b>
                  </p>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
