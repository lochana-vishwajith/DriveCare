import "./viewFines.css";
import React, { Component } from "react";
import axios from "axios";
import AuthContext from "../../../Reducer/UseReducer";

export default class viewFine extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      fines: [],
    };
  }

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
            )}
          </div>
        ))}
      </div>
    );
  }
}
