import { Grid, Paper } from "@material-ui/core";
import DateBox from "devextreme-react/date-box";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import Button from "../../ButtonComponent/button";
import "./DriverProfileUpdate.css";
import { storage } from "../../../firebase/firebase";
import { toast } from "react-toastify";
import axios from "axios";

export default class DriverProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fName: "",
      lName: "",
      displayName: "",
      nic: "",
      dob: "",
      email: "",
      mobile: "",
      address: "",
      dLisenseNo: "",
      licenceExDate: "",
      profilePic: "",
      profilePicUrl: "",
      image:
        "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628183905292_pngwing.com.png?alt=media&token=0f85489d-8c99-4f2b-9d0e-1144b64c733d",
      driverDetails: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/driver/L1254869")
      .then((result) => {
        console.log("Data:", result.data);
        this.setState({ driverDetails: result.data });
        console.log(this.state.driverDetails);
      })
      .catch((error) => {
        console.log("Data not Retriewed", error);
      });
  }

  fNameChange = (e) => {
    this.setState({ fName: e.value });
  };

  lNameChange = (e) => {
    this.setState({ lName: e.value });
  };

  dNameChange = (e) => {
    this.setState({ displayName: e.value });
  };

  dLicenceChange = (e) => {
    this.setState({ dLisenseNo: e.value });
  };

  emailChange = (e) => {
    this.setState({ email: e.value });
  };

  nicChange = (e) => {
    this.setState({ nic: e.value });
  };

  dobChanged = (e) => {
    this.setState({ dob: e.value });
  };

  mobileChange = (e) => {
    this.setState({ mobile: e.value });
  };

  addressChange = (e) => {
    this.setState({ address: e.value });
  };

  licenceExChange = (e) => {
    this.setState({ licenceExDate: e.value });
  };

  hnadlerFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        this.setState({ image: reader.result });
        this.setState({ profilePic: e.target.files[0] });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  imageUpload = () => {
    const { profilePic } = this.state;
    const date = Date.now();

    const uploadTask = storage
      .ref(`images/profileImages/${date}_${profilePic.name}`)
      .put(profilePic);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        toast.error("Image Uploading Failed Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      () => {
        storage
          .ref("images/profileImages/")
          .child(`${date}_${profilePic.name}`)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ profilePicUrl: url });
            setTimeout(this.onSubmit(), 1000);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Image Uploading Failed Failed", {
              position: toast.POSITION.TOP_RIGHT,
            });
          });
      }
    );
  };

  onSubmit = async () => {};

  render() {
    const { driverDetails } = this.state;
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
            <Paper elevation={20} className="p-4">
              <div>
                {driverDetails.map((item, index) => (
                  <center key={index}>
                    {!item.profilePicURL ? (
                      <img
                        src={this.state.image}
                        class="shadow-1-strong rounded mb-4"
                        id="profilePic"
                        alt=""
                      />
                    ) : (
                      <img
                        src={this.state.profilePicUrl}
                        class="shadow-1-strong rounded mb-4"
                        id="profilePic"
                        alt=""
                      />
                    )}
                    <br />
                    <input
                      type="file"
                      id="driverImgBtn"
                      name="profImage"
                      onChange={this.hnadlerFileChange}
                      hidden
                    />
                    <label
                      type="file"
                      class="btn btn-outline-danger btn-sm px-4"
                      for="driverImgBtn"
                    >
                      Upload Profile Picture
                    </label>
                  </center>
                ))}
              </div>
              {driverDetails.map((item, index) => (
                <div className="d-grid" key={index}>
                  <div className="dx-fieldset">
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">First Name</label>
                      <TextBox
                        name="fName"
                        value={this.state.fName}
                        onValueChanged={this.fNameChange}
                        showClearButton={true}
                        placeholder={item.firstName}
                      >
                        <Validator>
                          <RequiredRule message="First Name is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">Last Name</label>
                      <TextBox
                        name="lName"
                        showClearButton={true}
                        value={this.state.lName}
                        onValueChanged={this.lNameChange}
                        placeholder={item.lastName}
                      >
                        <Validator>
                          <RequiredRule message="Last Name is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">Display Name</label>
                      <TextBox
                        name="displayName"
                        showClearButton={true}
                        value={this.state.displayName}
                        onValueChanged={this.dNameChange}
                        placeholder={item.displayName}
                      >
                        <Validator>
                          <RequiredRule message="Display Name is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">NIC</label>
                      <TextBox
                        name="nic"
                        // mask="000000000a"
                        showClearButton={true}
                        value={this.state.nic}
                        onValueChanged={this.nicChange}
                        placeholder={item.NIC}
                      >
                        <Validator>
                          <RequiredRule message="NIC Number is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">Date of Birth</label>
                      <DateBox
                        type="date"
                        className="dob"
                        name="dob"
                        value={this.state.dob}
                        showClearButton={true}
                        onValueChanged={this.dobChanged}
                        placeholder={item.dob}
                      >
                        <Validator>
                          <RequiredRule message="Birthday is required" />
                        </Validator>
                      </DateBox>
                    </div>
                  </div>
                  <div className="dx-fieldset">
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">Email</label>
                      <TextBox
                        name="email"
                        showClearButton={true}
                        value={this.state.email}
                        onValueChanged={this.emailChange}
                        placeholder={item.email}
                      >
                        <Validator>
                          <RequiredRule message="Email is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">Mobile</label>
                      <TextBox
                        name="mobile"
                        // mask="0000000000"
                        showClearButton={true}
                        value={this.state.mobile}
                        onValueChanged={this.mobileChange}
                        placeholder={item.mobile}
                      >
                        <Validator>
                          <RequiredRule message="Mobile Number is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">Address</label>
                      <TextBox
                        name="address"
                        showClearButton={true}
                        value={this.state.address}
                        onValueChanged={this.addressChange}
                        placeholder={item.address}
                      >
                        <Validator>
                          <RequiredRule message="Address is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">Driving Lincence Number</label>
                      <TextBox
                        name="dLisenseNo"
                        // mask="a0000000"
                        showClearButton={true}
                        value={this.state.dLisenseNo}
                        onValueChanged={this.dLicenceChange}
                        placeholder={item.licenceNumber}
                      >
                        <Validator>
                          <RequiredRule message="Licence Number is required" />
                        </Validator>
                      </TextBox>
                    </div>
                    <div className="dx-field" id="d-text-in">
                      <label id="labelName">Licence Expiry Date</label>
                      <DateBox
                        type="date"
                        className="dob"
                        name="licenceExDate"
                        value={this.state.licenceExDate}
                        showClearButton={true}
                        onValueChanged={this.licenceExChange}
                        placeholder={item.licenceExpiryDate}
                      >
                        <Validator>
                          <RequiredRule message="Licence Expiry Date is required" />
                        </Validator>
                      </DateBox>
                    </div>
                  </div>
                </div>
              ))}
              <center>
                <button
                  type="submit"
                  class="btn btn-outline-danger btn-sm px-4"
                  onClick={this.onSubmit}
                >
                  Save Changes
                </button>
              </center>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
