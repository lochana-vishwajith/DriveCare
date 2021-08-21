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
import Header from "../TrafficOfficerHeader/trafficOfficerHeader";

const violations = [
  {
    value: [1200.0, "611b3f058448cc2c78a12776"],
    label: "sssss",
  },
  {
    value: [3000.0, "611b3f058448cc2c78a12776"],
    label: "dddd",
  },
  {
    value: [1000.0, "611b3f058448cc2c78a12776"],
    label: "hhhh",
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
      courtDate: "",
      violationType: [],
      selectedDriverDetails: "",
      totalFine: 0,
      onSelectDriver: "",
      officerDetails: [],
      ViolationRules: [],
    };
  }

  getViolationRules = () => {
    axios
      .get("http://localhost:9000/rules")
      .then((res) => {
        console.log("Data : ", res.data);
        this.setState({ ViolationRules: res.data });
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
      officerDetails: [
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
        this.setState({
          expire: moment(element.licenceExpiryDate).format("YYYY-MM-DD"),
        });
      }
    });
  };

  handlerChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  courtDateSelected = (e) => {
    this.setState({ courtDate: e.value });
  };

  onSelectDriver = (onSelectDriver) => {
    this.setState({ onSelectDriver });
    this.getDriverDetailsByNic(onSelectDriver.value);
  };

  onSelectViolationType = (violationType) => {
    this.setState({ violationType });
    this.calculateTotalFine();
  };

  calculateTotalFine = () => {
    this.setState(
      this.state.violationType.forEach((element) => {
        this.state.totalFine = this.state.totalFine + element.value[0];
      })
    );
  };

  onCreateFine = () => {
    const {
      violationType,
      finetype,
      selectedDriverDetails,
      courtDate,
      officerDetails,
    } = this.state;
    const details = {
      driverID: selectedDriverDetails._id,
      violationType,
      Officers: officerDetails._id,
      courtDate,
      fineType: finetype,
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
    const { onSelectDriver, violationType, finetype, selectedDriverDetails } =
      this.state;

    return (
      <div>
        <Header />
        <div className="container">
          <div className="createFineMainDiv">
            <h2>
              <b>Create Fine</b>
            </h2>
            <hr />
            <div className="createFineGrid">
              <div className="formDiv">
                <Grid>
                  <Paper elevation={20}>
                    <div className="fineForm">
                      <form>
                        <br />
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
                                Date Of Birth :
                              </label>

                              <TextBox
                                value={this.state.dob}
                                showClearButton={true}
                                className="fineTextBox"
                                readOnly={true}
                              />
                            </div>
                            <div className="leftDiv">
                              <label className="fineDriverName">
                                Driver Mobile No :
                              </label>

                              <TextBox
                                value={this.state.mobile}
                                showClearButton={true}
                                className="fineTextBox"
                                readOnly={true}
                              />
                            </div>
                            <div>
                              <label className="fineDriverName">
                                Licence Expire Date :
                              </label>

                              <TextBox
                                value={this.state.expire}
                                showClearButton={true}
                                className="fineTextBox"
                                readOnly={true}
                              />
                            </div>
                          </div>

                          <label className="fineDriverName">
                            Violation Type :
                          </label>

                          <Select
                            className="basic-single"
                            isSearchable={true}
                            options={violations}
                            onChange={this.onSelectViolationType}
                            value={violationType}
                            id="officerSelectVio"
                            isMulti
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
                            <DateBox
                              type="date"
                              className="courtDate"
                              name="courtDate"
                              value={this.state.courtDate}
                              showClearButton={true}
                              onValueChanged={this.courtDateSelected}
                            />
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
                  </Paper>
                </Grid>
              </div>
              <div className="pointOfficer">
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
