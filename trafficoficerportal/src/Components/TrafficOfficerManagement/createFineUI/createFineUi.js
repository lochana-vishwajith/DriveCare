import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Select from "react-select";
import axios from "axios";
import "./createFineUi.css";
import moment from "moment";
import DateBox from "devextreme-react/date-box";
import Button from "../../ButtonComponent/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const competentDrive = ["A", "B", "C"];

const Court = [
  {
    value: "Kotuwa",
    label: "Kotuwa",
  },
  {
    value: "Nugegoda",
    label: "Nugegoda",
  },
  {
    value: "Kaduwela",
    label: "Kaduwela",
  },
];

export default class createFineUi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diverDetails: [],
      diverNicId: [],
      selectedDriver: "",
      diverNicSearchOff: "",
      driverName: "",
      dob: "",
      mobile: "",
      expire: "",
      finetype: "",
      address: "",
      courtDate: "",
      licenseIssueDate: "",
      violationtype: [],
      selectedDriverDetails: "",
      totalFine: 0,
      onSelectDriver: "",
      Officers: [],
      ViolationRules: [],
      offenceDate: "",
      place: "",
      vehicelNo: "",
      CourtPlace: "",
      allrules: [],
      image:
        "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628183905292_pngwing.com.png?alt=media&token=0f85489d-8c99-4f2b-9d0e-1144b64c733d",
    };
    this.now = new Date();
  }

  getViolationRules = () => {
    axios
      .get("http://localhost:9000/rules")
      .then((res) => {
        console.log("Data : ", res.data);
        this.setState({ ViolationRules: res.data });
        let violations = [];
        this.state.ViolationRules.map((item, index) => {
          let categoryDetails = {
            value: item._id,
            label: item.ruleName,
          };
          console.log(categoryDetails.value);
          violations.push(categoryDetails);
        });
        this.setState({ allrules: violations });
      })
      .catch((err) => {
        console.log("failed to get rules");
        toast.error("Failed To Retreive Rules", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:9000/driver")
      .then((res) => {
        console.log("driver details : ", res.data);
        this.setState({ diverDetails: res.data });
        let dirivers = [];
        this.state.diverDetails.map((item, index) => {
          let categoryDetails = {
            value: item._id,
            label: item.NIC,
          };

          dirivers.push(categoryDetails);
        });
        this.setState({ diverNicId: dirivers });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed To Retreive Drivers", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });

    this.setState({
      Officers: [
        localStorage.getItem("officerOne"),
        localStorage.getItem("officerTwo"),
      ],
    });
    this.getViolationRules();
  }

  getDriverDetailsByNic = (id) => {
    console.log("Nic : ", id);
    this.state.diverDetails.forEach((element) => {
      if (element._id === id) {
        console.log("element", element);
        this.setState({
          driverName: `${element.firstName} ${element.lastName}`,
        });
        this.setState({ dob: moment(element.dob).format("YYYY-MM-DD") });
        this.setState({ mobile: element.mobile });
        this.setState({ selectedDriverDetails: element });
        this.setState({ image: element.profilePicURL });
        this.setState({ address: element.address });
        this.setState({
          expire: moment(element.licenceExpiryDate).format("YYYY-MM-DD"),
        });
        this.setState({
          licenseIssueDate: moment(element.licenseIssueDate).format(
            "YYYY-MM-DD"
          ),
        });
      }
    });
  };

  offenceDateChanged = (e) => {
    this.setState({ offenceDate: e.value });
  };
  placeChanged = (e) => {
    this.setState({ place: e.value });
  };
  vehicelNoChanged = (e) => {
    this.setState({ vehicelNo: e.value });
  };

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  courtDateSelected = (e) => {
    this.setState({ courtDate: e.value });
  };
  offenceDateSelected = (e) => {
    this.setState({ offenceDate: e.value });
  };

  onSelectDriver = (onSelectDriver) => {
    this.setState({ onSelectDriver });
    this.getDriverDetailsByNic(onSelectDriver.value);
  };

  onSelectViolationType = (violationtype) => {
    this.setState({ violationtype });
    console.log("v T :", violationtype);
  };
  onSelectCourtPlace = (CourtPlace) => {
    this.setState({ CourtPlace });
  };

  calculateTotalFine = () => {
    this.setState(
      this.state.violationtype.forEach((element) => {
        this.state.totalFine = this.state.totalFine + element.value[0];
      })
    );
  };

  onCreateFine = () => {
    const {
      selectedDriverDetails,
      violationtype,
      Officers,
      courtDate,
      finetype,
      vehicelNo,
      offenceDate,
      place,
      CourtPlace,
    } = this.state;
    console.log("v : ", violationtype);
    const details = {
      driverID: selectedDriverDetails._id,
      violationtype,
      Officers,
      courtDate,
      fineType: finetype,
      vehicelNo,
      offenceDate,
      place,
      CourtPlace,
    };
    axios
      .post("http://localhost:9000/fine", details)
      .then((res) => {
        toast.success("Successfully Fine Created", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        toast.error("Fine Creation Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  render() {
    const {
      onSelectDriver,
      violationtype,
      finetype,
      selectedDriverDetails,
      CourtPlace,
      image,
    } = this.state;

    return (
      <div>
        <div className="container">
          <div className="createFineMainDiv">
            <br />
            <div className="createFineGrid">
              <div className="formDiv">
                <Grid>
                  <Paper elevation={20}>
                    <div className="fineForm">
                      <br />
                      <h3 className="createFineTxt">
                        <b>Create Fine</b>
                      </h3>
                      <hr />
                      <form>
                        <label className="officerSelectDriver">
                          Driver NIC :
                        </label>
                        <Select
                          className="basic-single"
                          isSearchable={true}
                          name="diverNicSearchOff"
                          options={this.state.diverNicId}
                          onChange={this.onSelectDriver}
                          value={onSelectDriver}
                          id="officerSelectDriver"
                        />
                        <hr className="officerSelectDriverHr" />

                        <div className="dx-fieldset">
                          <div className="fineInnerGrid">
                            <div className="leftDiv">
                              <label className="fineDriverName">
                                Driver Name :
                              </label>
                              <br />
                              <TextBox
                                value={this.state.driverName}
                                showClearButton={true}
                                className="fineTextBox"
                                readOnly={true}
                              />
                            </div>
                            <div>
                              <label className="fineDriverName">
                                Home Address :
                              </label>

                              <TextBox
                                value={this.state.address}
                                showClearButton={true}
                                className="fineTextBox"
                                readOnly={true}
                              />
                            </div>

                            <div className="leftDiv">
                              <label className="fineDriverName">
                                Licence Valid Period :
                              </label>
                              <div className="FineValidPerio">
                                <div>
                                  <TextBox
                                    value={this.state.licenseIssueDate}
                                    showClearButton={true}
                                    className="fineTextBox"
                                    readOnly={true}
                                  />
                                </div>
                                <div>
                                  <label className="fineTo">to</label>
                                </div>
                                <div>
                                  <TextBox
                                    value={this.state.expire}
                                    showClearButton={true}
                                    className="fineTextBox"
                                    readOnly={true}
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="fineDriverName">
                                Date & Time Of Offence :
                              </label>

                              <DateBox
                                type="datetime"
                                className="fineTextBox"
                                name="offenceDate"
                                defaultValue={this.now}
                                value={this.state.offenceDate}
                                showClearButton={true}
                                onValueChanged={this.offenceDateSelected}
                              />
                            </div>
                            <div className="leftDiv">
                              <label className="fineDriverName">Place :</label>
                              <br />
                              <TextBox
                                value={this.state.place}
                                showClearButton={true}
                                className="fineTextBox"
                                onValueChanged={this.placeChanged}
                              />
                            </div>
                            <div>
                              <label className="fineDriverName">
                                Vehicle Registration Number :
                              </label>
                              <br />
                              <TextBox
                                value={this.state.vehicelNo}
                                showClearButton={true}
                                className="fineTextBox"
                                onValueChanged={this.vehicelNoChanged}
                              />
                            </div>
                          </div>

                          <label className="fineDriverName">
                            Violation Type :
                          </label>

                          <Select
                            className="basic-single"
                            isSearchable={true}
                            options={this.state.allrules}
                            onChange={this.onSelectViolationType}
                            value={violationtype}
                            id="officerSelectVio"
                            isMulti
                          />
                          <br />
                          <label className="fineDriverName">
                            Competent To Drive :
                          </label>

                          <Select
                            className="basic-single"
                            value={competentDrive}
                            id="officerSelectVio"
                            isMulti
                            readOnly
                          />
                          <br />
                          <div className="fineRadio">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="finetype"
                                id="onPremises"
                                value="onPremises"
                                onChange={this.handlerChange}
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault1"
                              >
                                On Premises
                              </label>
                            </div>
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="finetype"
                                id="court"
                                value="court"
                                onChange={this.handlerChange}
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault1"
                              >
                                Court
                              </label>
                            </div>
                          </div>
                          <br />
                          {finetype == "court" && (
                            <div className="fineInnerGrid">
                              <div className="leftDiv">
                                <label className="fineDriverName">
                                  Court Date :
                                </label>
                                <DateBox
                                  type="date"
                                  className="courtDate"
                                  name="courtDate"
                                  value={this.state.courtDate}
                                  showClearButton={true}
                                  onValueChanged={this.courtDateSelected}
                                />
                              </div>
                              <div>
                                <label className="fineDriverName">
                                  Court :
                                </label>
                                <Select
                                  className="basic-single"
                                  isSearchable={true}
                                  options={Court}
                                  onChange={this.onSelectCourt}
                                  value={CourtPlace}
                                  id="officerSelectVio"
                                  onChange={this.onSelectCourtPlace}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </form>
                    </div>
                    <center>
                      <Button
                        id={"createFine"}
                        value={"Create Fine"}
                        classname={"createFineBtn"}
                        type={"submit"}
                        onSubmit={this.onCreateFine}
                      />
                    </center>
                    <br />
                    <br />
                    <br />
                  </Paper>
                </Grid>
              </div>
              <div className="pointOfficer">
                <center>
                  <img
                    src={image}
                    class="w-100 shadow-1-strong rounded mb-4"
                    id="profilePicOfficer"
                    alt=""
                  />
                </center>
                <div className="diverCards">
                  <div
                    className="shadow-lg p-3 mb-5 bg-white rounded"
                    id="driverOfficerCards"
                  >
                    <div className="card-body">
                      <h5 className="card-title" id="officerDisRem">
                        Remaining Points
                      </h5>
                      <center>
                        <p className="card-text">
                          {selectedDriverDetails.points >= 20 && (
                            <b className="pointGreenOfficer">
                              {selectedDriverDetails.points}
                            </b>
                          )}
                          {selectedDriverDetails.points >= 10 &&
                            selectedDriverDetails.points < 20 && (
                              <b className="pointYellowOfficer">
                                {selectedDriverDetails.points}
                              </b>
                            )}
                          {selectedDriverDetails.points >= 0 &&
                            selectedDriverDetails.points < 10 && (
                              <b className="pointYellowOfficer">
                                {selectedDriverDetails.points}
                              </b>
                            )}
                        </p>
                      </center>
                    </div>
                  </div>
                </div>
                <div className="diverCards" id="driverStatusOfficer">
                  <div
                    className="shadow-lg p-3 mb-5 bg-white rounded"
                    id="driverOfficerCards"
                  >
                    <div className="card-body">
                      <h5 className="card-title" id="officerDisRem">
                        Driving Licence Status
                      </h5>
                      <center>
                        <p className="card-text">
                          {selectedDriverDetails.licenceStatus === "Active" && (
                            <b className="pointGreenOfficer">
                              {selectedDriverDetails.licenceStatus}
                            </b>
                          )}
                          {selectedDriverDetails.licenceStatus >= "Pending" && (
                            <b className="pointYellowOfficer">
                              {selectedDriverDetails.licenceStatus}
                            </b>
                          )}
                          {selectedDriverDetails.licenceStatus >= "Cancel" && (
                            <b className="pointYellowOfficer">
                              {selectedDriverDetails.licenceStatus}
                            </b>
                          )}
                        </p>
                      </center>
                    </div>
                  </div>
                </div>
                <div className="diverCards" id="driverStatusOfficer">
                  <div
                    className="shadow-lg p-3 mb-5 bg-white rounded"
                    id="driverOfficerCards"
                  >
                    <div className="card-body">
                      <h5 className="card-title" id="officerDisRem">
                        Total Fine
                      </h5>
                      <center>
                        <p className="card-text">
                          <b className="fineTotal">{this.state.totalFine}</b>
                        </p>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
