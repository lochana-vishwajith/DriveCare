import "./viewFines.css";
import React, { Component } from "react";
import axios from "axios";

export default class viewFine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fines: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/fine/")
      .then((res) => {
        this.setState({ fines: res.data });
        console.log("data : ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container">
        <div className="viewDiv">
          <div id="viewDivPay" className="shadow-lg p-3 mb-5 bg-white rounded">
            Larger shadow
          </div>

          <div
            id="viewDivPending"
            className="shadow-lg p-3 mb-5 bg-white rounded"
          >
            Larger shadow
          </div>
          <div id="viewDivPay" className="shadow-lg p-3 mb-5 bg-white rounded">
            Larger shadow
          </div>

          <div
            id="viewDivPending"
            className="shadow-lg p-3 mb-5 bg-white rounded"
          >
            Larger shadow
          </div>
          <div id="viewDivPay" className="shadow-lg p-3 mb-5 bg-white rounded">
            Larger shadow
          </div>

          <div
            id="viewDivPending"
            className="shadow-lg p-3 mb-5 bg-white rounded"
          >
            Larger shadow
          </div>
          <div id="viewDivPay" className="shadow-lg p-3 mb-5 bg-white rounded">
            Larger shadow
          </div>

          <div
            id="viewDivPending"
            className="shadow-lg p-3 mb-5 bg-white rounded"
          >
            Larger shadow
          </div>
          <div id="viewDivPay" className="shadow-lg p-3 mb-5 bg-white rounded">
            Larger shadow
          </div>

          <div
            id="viewDivPending"
            className="shadow-lg p-3 mb-5 bg-white rounded"
          >
            Larger shadow
          </div>
        </div>
      </div>
    );
  }
}
