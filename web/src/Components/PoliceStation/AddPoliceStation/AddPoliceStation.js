import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import Button from "../../ButtonComponent/button";

export default class PoliceStationLogin extends Component {
    constructor(props) {
        super(props);

        this.state ={
            registrationNo: '',
            email:'',
            workstation_Address:'',
            mobile_Number:'',
            office_Number:'',
            password:'',
            station_grade:''
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="mt-1">
                        <center>
                            <div className="d-reg">
                                <i>Welcome to</i>
                            </div>
                            <div className="d-dc">
                                <b>DriveCare Police Station Add</b>
                            </div>
                        </center>
                        <hr></hr>
                    </div>
                    <Grid>
                        <Paper elevation={20}>
                            <div className="d-center-form">


                                <form>
                                    <div className="one-line-box">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="name" float = "right" >registrationNo</label>
                                            <input type="text" className="form-control" id="name"
                                                   placeholder="Name" name="name"/>
                                        </div>
                                        <div className="text-box-2">
                                            <label htmlFor="nicNumber">office_Number</label>
                                            <input type="text" className="form-control" id="nicNumber"
                                                   placeholder="NIC Number" name="nicNumber"/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="workstation">workstation_Address</label>
                                        <input type="text" className="form-control" id="workstation"
                                               placeholder="workstation" name="workstation"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="OfficeAddress">email</label>
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
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="password" password= "right" >Password</label>
                                            <input type="password" className="form-control" id="password"
                                                   placeholder="Password" name="password"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="rPassword">Re-Enter Password</label>
                                            <input type="password" className="form-control" id="rPassword"
                                                   placeholder="Re-Enter Password" name= "rPassword"/>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-primary">Sign in</button>
                                </form>


                            </div>
                        </Paper>
                    </Grid>
                </div>
            </div>
        );
    }
}
