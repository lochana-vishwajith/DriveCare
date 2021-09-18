import "./viewFines.css";
import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../../Reducer/UseReducer";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import TextBox from "devextreme-react/text-box";
import OfficerLogin from "../TrafficOfficerloginComponent/trafficOfficerLogin";

export default class viewFine extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      fines: [],
      popupVisible: false,
      positionOf: "",
      dirvername: "",
      finetotal: "",
      licenceNumber: "",
      selectedImage: [],
    };
  }

  imageHandleChange = (e) => {
    console.log(e.target.files);
    if (e.target.files) {
      Array.from(e.target.files).map((file) => {
        console.log(URL.createObjectURL(file));
        this.state.selectedImage.push(URL.createObjectURL(file));
      });
    }
    console.log("images : ", this.state.selectedImage);
  };

  handleOpen = (id) => {
    this.setState({ popupVisible: true });

    this.state.fines.forEach((detail) => {
      if (detail._id == id) {
        this.setState({
          dirvername: `${detail.driverID.firstName} ${detail.driverID.lastName}`,
          licenceNumber: detail.driverID.licenceNumber,
        });
      }
    });
  };
  handleClose = () => {
    this.setState({ popupVisible: false });
  };

  componentDidMount() {
    const { officerOne } = this.context;
    axios
      .get(`http://localhost:9000/fine/officer/${officerOne}`)
      .then((res) => {
        this.setState({ fines: res.data });
        console.log("data : ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  renderPhotos = (source) => {
    return source.map((photo) => {
      return <img src={photo} key={photo} />;
    });
  };
  render() {
    const { fines } = this.state;
    const { isAutheticated } = this.context;
    return (
      <div className="container">
        <Popup
          visible={this.state.popupVisible}
          onHiding={this.handleClose}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showCloseButton={true}
          showTitle={true}
          title="Add Fine Confirmation Images"
          container=".dx-viewport"
          width={900}
          height={280}
        >
          <Position at="center" my="center" of={this.state.positionOf} />

          <div className="dx-field" id="d-text-in">
            <div className="payDetials">
              <div>
                <lable>
                  <b>Driver Name : </b>
                </lable>
                <lable>{this.state.dirvername}</lable>
              </div>
              <div>
                <lable>
                  <b>Licence Number : </b>
                </lable>
                <lable>{this.state.licenceNumber}</lable>
              </div>
              <div>
                <lable>
                  <b>Fine Total : </b>
                </lable>
                <lable>{this.state.finetotal}</lable>
              </div>
            </div>
            <hr />
            <div>
              <input
                type="file"
                id="file"
                hidden
                className="officerImgBtn"
                multiple
                onChange={this.imageHandleChange}
              />
              <div className="lable-holder">
                <label htmlFor="file" className="lable officerImgBtnlabel">
                  <i className="fas fa-upload upload">Upload Images</i>
                </label>
              </div>
              <div>
                {this.state.selectedImage.map((photo) => (
                  <img src={photo} width="40px" />
                ))}
              </div>
            </div>
          </div>
        </Popup>
        {isAutheticated && (
          <div className="viewDiv">
            {fines.map((fine) => (
              <div className="cardView" key={fine._id}>
                {fine.isPayed && fine.fineType === "onPremises" && (
                  <div
                    key={fine._id}
                    id="viewDivPay"
                    className="shadow-lg p-3 mb-5 bg-white rounded"
                  ></div>
                )}

                {!fine.isPayed && fine.fineType === "onPremises" && (
                  <div
                    key={fine._id}
                    id="viewDivPending"
                    className="shadow-lg p-3 mb-5 bg-white rounded"
                  >
                    <div>
                      <p className="fineViewTxt first">
                        <lable>Vehicle Number : </lable>
                        <label>{fine.vehicelNo}</label>
                      </p>
                      <p className="fineViewTxt">
                        <label>Violation Type/s : </label>
                        {fine.violationType.map((vio) => (
                          <label>{vio.ruleName}</label>
                        ))}
                      </p>
                      <p className="fineViewTxt">
                        <label>Total Amount : </label>
                      </p>
                      <p className="fineViewTxt">
                        <lable>License Number : </lable>
                        <label>{fine.driverID.licenceNumber}</label>
                      </p>
                    </div>
                    <div></div>
                    <div>
                      <button
                        type="button"
                        class="btn btn-light"
                        onClick={() => this.handleOpen(fine._id)}
                      >
                        Confirm Payment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {!isAutheticated && <OfficerLogin />}
      </div>
    );
  }
}
