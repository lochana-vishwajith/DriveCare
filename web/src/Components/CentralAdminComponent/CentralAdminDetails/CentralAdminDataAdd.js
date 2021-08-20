import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import "./Centraladmin.css"
import Button from "../../ButtonComponent/button";

export default class PoliceStationLogin extends Component {
    constructor(props) {
        super(props);

    }
    //name,nicNumber,email,workstation,mobileNumber,officeAddress,officeNumber,officerRegistrationNumber
    render() {
        return (
            <div>
                            <div className="d-center-form">
                                <form>
                                    <div className="one-line-box">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="name" float = "right" >Name</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="Name" name="name"/>
                                        </div>
                                        <div className="text-box-2">
                                            <label htmlFor="nicNumber">NIC Number</label>
                                            <input type="text" className="form-control" id="nicNumber"
                                                   placeholder="NIC Number" name="nicNumber"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="workstation">workstation</label>
                                        <input type="text" className="form-control" id="workstation"
                                               placeholder="workstation" name="workstation"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="OfficeAddress">officeAddress</label>
                                        <input type="text" className="form-control" id="OfficeAddress"
                                               placeholder="Office Address"  name ="OfficeAddress"/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" name = "email" placeholder="Email"/>
                                        </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="officerRegistrationNumber">Officer RegistrationNumber</label>
                                                <input type="text" className="form-control" id="officerRegistrationNumber" name = "officerRegistrationNumber"
                                                       placeholder="Officer RegistrationNumber"/>
                                            </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="officeTelephone" float = "right" >Office Telephone Number</label>
                                            <input type="name" className="form-control" id="officeTelephone"
                                                   placeholder="Office Telephone Number" name="officeTelephone"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="mobileNumber">Mobile Number</label>
                                            <input type="text" className="form-control" id="mobileNumber"
                                                   placeholder="Mobile Number" name= " mobileNumber"/>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Sign in</button>
                                </form>

                            </div>
                       </div>
        );
    }
}
