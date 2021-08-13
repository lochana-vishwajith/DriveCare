import "./trfficOfficerReg.css";
import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import DateBox from "devextreme-react/date-box";
import Button from "../../ButtonComponent/button";
import { storage } from "../../../firebase/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class trafficOfficerReg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      nameInitial: "",
      dob: "",
      mobile: "",
      home: "",
      nic: "",
      officerReg: "",
      profilePic: "",
      profilePicUrl: "",
      image:
        "https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1628183905292_pngwing.com.png?alt=media&token=0f85489d-8c99-4f2b-9d0e-1144b64c733d",
    };
  }
  firstNameChanged = (e) => {
    this.setState({ firstName: e.value });
  };
  lastNameChanged = (e) => {
    this.setState({ lastName: e.value });
  };
  nameInitialChanged = (e) => {
    this.setState({ nameInitial: e.value });
  };
  dobChanged = (e) => {
    this.setState({ dob: e.value });
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
  officerRegChanged = (e) => {
    this.setState({ officerReg: e.value });
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
      },
      () => {
        storage
          .ref("images/profileImages/")
          .child(`${date}_${profilePic.name}`)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ profilePicUrl: url });
            //setTimeout(this.SubmitDetails(), 1000);
          });
      }
    );
  };

  onSubmit = () => {
    try {
      if (
        this.state.firstName == "" ||
        this.state.lastName == "" ||
        this.state.nameInitial == "" ||
        this.state.dob == "" ||
        this.state.mobile == "" ||
        this.state.home == "" ||
        this.state.nic == "" ||
        this.state.officerReg == "" ||
        this.state.profilePicUrl == ""
      ) {
        toast.error("Please Fill The Form Correctly", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        this.imageUpload();
        toast.success("Successfully Registered", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      console.log("Error in reg on submit" + err);
      toast.error("Registration Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  render() {
    const { image } = this.state;
    return (
      <div className="container">
        <div className="outerDiv">
          <h3>
            <b>Traffic Officer Registration</b>
          </h3>
          <hr />
          <br />
          <Grid>
            <Paper elevation={20}>
              <div className="grid">
                <div className="gridR">
                  <div className="dx-fieldset">
                    <div className="nameDiv">
                      <div className="dx-field" id="firstName">
                        <label>First Name</label>
                        <br />
                        <TextBox
                          className="firstNameTxt"
                          name="firstName"
                          value={this.state.firstName}
                          showClearButton={true}
                          onValueChanged={this.firstNameChanged}
                        />
                      </div>
                      <div className="dx-field" id="lastName">
                        <label>Last Name</label>
                        <br />
                        <TextBox
                          className="lastNameTxt"
                          name="lastName"
                          value={this.state.lastName}
                          showClearButton={true}
                          onValueChanged={this.lastNameChanged}
                        />
                      </div>
                    </div>
                    <div className="dx-field">
                      <label>Name With Initials</label>
                      <br />
                      <TextBox
                        className="nameInitialTxt"
                        name="nameInitial"
                        value={this.state.nameInitial}
                        showClearButton={true}
                        onValueChanged={this.nameInitialChanged}
                      />
                    </div>
                    <div className="dx-field">
                      <label>Date Of Birth</label>
                      <br />
                      <DateBox
                        type="date"
                        className="dob"
                        name="dob"
                        value={this.state.dob}
                        showClearButton={true}
                        onValueChanged={this.dobChanged}
                      />
                    </div>
                    <br />
                    <div className="nameDiv">
                      <div className="dx-field" id="firstName">
                        <label className="mobileLong">Mobile Number</label>
                        <label className="mobileShort">Mobile No</label>
                        <br />
                        <TextBox
                          mask="(000) 000-0000"
                          className="mobile"
                          name="mobile"
                          value={this.state.mobile}
                          showClearButton={true}
                          onValueChanged={this.mobileChanged}
                        />
                      </div>
                      <div className="dx-field" id="lastName">
                        <label>Home</label>
                        <br />
                        <TextBox
                          mask="(000) 000-0000"
                          className="homeTxt"
                          name="home"
                          value={this.state.home}
                          showClearButton={true}
                          onValueChanged={this.homeChanged}
                        />
                      </div>
                    </div>
                    <br />
                    <div className="nameDiv">
                      <div className="dx-field" id="firstName">
                        <label>NIC</label>
                        <br />
                        <TextBox
                          className="nic"
                          name="nic"
                          value={this.state.nic}
                          showClearButton={true}
                          onValueChanged={this.nicChanged}
                        />
                      </div>
                      <div className="dx-field" id="lastName">
                        <label className="officerLong">
                          Officer Registration Number
                        </label>
                        <label className="officerShort">Officer No</label>
                        <br />
                        <TextBox
                          mask="0000000000"
                          className="officerReg"
                          name="officerReg"
                          value={this.state.officerReg}
                          showClearButton={true}
                          onValueChanged={this.officerRegChanged}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="gridL">
                  <div className="profilePicDiv">
                    <center>
                      <img
                        src={image}
                        class="w-100 shadow-1-strong rounded mb-4"
                        id="profilePic"
                        alt=""
                      />
                    </center>
                    <center>
                      <b>
                        <label className="profilePicLabel">
                          Upload A Profile Picture
                        </label>
                      </b>
                    </center>

                    <center>
                      <input
                        type="file"
                        className="officerImgBtn"
                        id="officerImgBtn"
                        name="profilePic"
                        onChange={this.hnadlerFileChange}
                        hidden
                      />
                    </center>
                    <center>
                      <label
                        for="officerImgBtn"
                        id="officerImgBtnlabel"
                        className="imgLong"
                      >
                        Choose An Image
                      </label>
                    </center>
                    <center>
                      <label
                        for="officerImgBtn"
                        id="officerImgBtnlabel"
                        className="imgShort"
                      >
                        Choose
                      </label>
                    </center>
                  </div>
                </div>
                <br />
              </div>
              <div>
                <center>
                  <Button
                    id={"officerReg"}
                    value={"Register"}
                    classname={"officerRegBtn"}
                    type={"submit"}
                    onSubmit={this.onSubmit}
                  />
                </center>
              </div>
              <br />
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
