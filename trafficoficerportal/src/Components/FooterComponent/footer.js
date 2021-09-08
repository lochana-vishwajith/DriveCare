import React, { Component } from "react";
import "./footer.css";

export default class footer extends Component {
  render() {
    return (
      <div>
        <div className="footer">
          <div className="container">
            <h5>
              <label className="footerlbl">Contact Us On : </label>
            </h5>
            <div className="footerTxtdiv">
              <label className="footerlbl tele contactPhone">Telephone :</label>
              <label className="footerlbl ">
                0112 - 854 778 / 0112 - 854779
              </label>
            </div>
            <div className="footerTxtdiv">
              <label className="footerlbl contactPhone">Fax : </label>
              <label className="footerlbl">011 - 2854 778</label>
            </div>
            <div className="footerTxtdiv">
              <label className="footerlbl contactPhone">Email :</label>
              <label className="footerlbl">rmvdrivecare@gmail.com</label>
            </div>
          </div>
          <div className="">
            <div>
              <label className="footerlbl">Follow Us On | </label>
            </div>
            <div>
              <i class="fas fa-facebook"></i>
            </div>
            <div>
              <i class="fas fa-twitter"></i>
            </div>
          </div>
        </div>
        <div className="footerDown"></div>
      </div>
    );
  }
}
