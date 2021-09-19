import "./viewFines.css";
import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../../Reducer/UseReducer";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import TextBox from "devextreme-react/text-box";
import OfficerLogin from "../TrafficOfficerloginComponent/trafficOfficerLogin";
import Button from "../../ButtonComponent/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../../firebase/firebase";

toast.configure();

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
      isImageAdded: false,
      finePayImgs: [],
      UploadedImageUrl: [],
      totalFine: "",
      id: "",
      driverID: "",
    };
  }

  imageHandleChange = (e) => {
    console.log(e.target.files[0]);

    if (e.target.files) {
      let tempImages = [];
      Array.from(e.target.files).map((file) => {
        tempImages.push(URL.createObjectURL(file));
      });
      this.setState({ selectedImage: tempImages });
      this.setState({ isImageAdded: true });

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          let images = [];
          Array.from(e.target.files).map((file) => {
            images.push(file);
          });
          this.setState({ finePayImgs: images });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  handleOpen = (id) => {
    this.setState({ popupVisible: true });
    this.setState({ selectedImage: [] });
    this.setState({ isImageAdded: false });
    this.setState({ id });

    this.state.fines.forEach((detail) => {
      if (detail._id == id) {
        this.setState({
          dirvername: `${detail.driverID.firstName} ${detail.driverID.lastName}`,
          licenceNumber: detail.driverID.licenceNumber,
          driverID: detail.driverID._id,
          totalFine: detail.totalFine,
        });
      }
    });
  };
  handleClose = () => {
    this.setState({ popupVisible: false });
  };

  uploadImagesToDb = () => {
    const { id, UploadedImageUrl, driverID } = this.state;
    console.log("urls : ", UploadedImageUrl);
    const details = {
      UploadedImageUrl: UploadedImageUrl,
      driverID,
    };
    console.log("Details : ", details);

    axios
      .put(`http://localhost:9000/fine/uploadImage/${id}`, details)
      .then((res) => {
        toast.success("Image Uploading Successfull", {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Image Uploading Not Successfull", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
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

  imageUpload = () => {
    try {
      const { finePayImgs } = this.state;
      const date = Date.now();
      let confirmImageUrl = [];
      finePayImgs.forEach((image) => {
        const uploadTask = storage
          .ref(`images/FineConfirmImages/${date}_${image.name}`)
          .put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images/FineConfirmImages/")
              .child(`${date}_${image.name}`)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                confirmImageUrl.push(url);
              });
          }
        );
      });

      console.log("uploaded : ", confirmImageUrl);
      this.setState({ UploadedImageUrl: confirmImageUrl });
      setTimeout(this.uploadImagesToDb, 1000);
    } catch (err) {
      console.log(err);
      toast.error("Image Uploading Failed Failed", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  render() {
    const { fines, isImageAdded } = this.state;
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
                <lable>{this.state.totalFine}</lable>
              </div>
            </div>
            <hr />
            <div>
              {!isImageAdded && (
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
                      <i className="fas fa-upload upload">Choose Images</i>
                    </label>
                  </div>
                </div>
              )}
              {isImageAdded && (
                <div>
                  <Button
                    id={"createFine"}
                    value={"Upload"}
                    classname={"createFineBtn"}
                    type={"submit"}
                    onSubmit={this.imageUpload}
                  />
                </div>
              )}

              <br />
              <div>
                {this.state.selectedImage.map((photo) => (
                  <img src={photo} width="120" />
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
                        <label>{fine.totalFine}</label>
                      </p>
                      <p className="fineViewTxt">
                        <lable>License Number : </lable>
                        <label>{fine.driverID.licenceNumber}</label>
                      </p>
                    </div>
                  </div>
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
                        <label>{fine.totalFine}</label>
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
