import "./viewFines.css";
import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../../Reducer/UseReducer";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import TextBox from "devextreme-react/text-box";

export default class viewFine extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      fines: [],
      popupVisible: false,
      positionOf: "",
    };
  }
  handleOpen = () => {
    this.setState({ popupVisible: true });
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
  render() {
    const { fines } = this.state;
    return (
      <div className="container">
        <Popup
          visible={this.state.popupVisible}
          onHiding={this.handleClose}
          dragEnabled={false}
          closeOnOutsideClick={true}
          showCloseButton={true}
          showTitle={true}
          title="Add Comment"
          container=".dx-viewport"
          width={300}
          height={280}
        >
          <Position at="center" my="center" of={this.state.positionOf} />

          <div className="dx-field" id="d-text-in"></div>
        </Popup>
        {fines.map((fine) => (
          <div className="viewDiv">
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
                    onClick={this.handleOpen}
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}
