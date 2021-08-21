import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import "./Centraladmin.css"
import Button from "../../ButtonComponent/button";

export default class PoliceStationLogin extends Component {
    constructor(props) {
        super(props);
        this.state ={
            name:'',
            nicNumber:'',
            email:'',
            workstation:'',
            mobileNumber:'',
            officeAddress:'',
            officeNumber:'',
            officerRegistrationNumber:''
        }

    }

    handlerSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);

    }

    handlerChange=(e)=>{

        this.setState({ [e.target.name]: e.target.value });

    }
    //name,nicNumber,email,workstation,mobileNumber,officeAddress,officeNumber,officerRegistrationNumber
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
                                <b>Edit Central Admin Details</b>
                            </div>
                        </center>
                        <hr></hr>
                    </div>
                    <Grid>
                        <Paper elevation={20}>
                            <div className="d-center-form">


                                <form onSubmit={this.handlerSubmit}>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" placeholder="Name"
                                                   aria-label="name" name = "name" onChange={this.handlerChange} id="name" value={this.state.name}/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="nicNumber">Nic Number</label>
                                            <input type="text" className="form-control" placeholder="Nic Number"
                                                   aria-label="nicNumber" id="nicNumber" onChange={this.handlerChange} name = "nicNumber" value={this.state.nicNumber}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="workstation">Workstation</label>
                                        <input type="text" className="form-control" id="workstation"
                                               placeholder="workstation" name="workstation" onChange={this.handlerChange} value={this.state.workstation}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="OfficeAddress">Office Address</label>
                                        <input type="text" className="form-control" id="OfficeAddress"
                                               placeholder="Office Address"  name ="officeAddress" onChange={this.handlerChange} value={this.state.officeAddress}/>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" id="email" onChange={this.handlerChange} name = "email" placeholder="Email" value={this.state.email}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="officerRegistrationNumber">Officer RegistrationNumber</label>
                                            <input type="text" className="form-control" id="officerRegistrationNumber" name = "officerRegistrationNumber"
                                                   placeholder="Officer RegistrationNumber" onChange={this.handlerChange} value={this.state.officerRegistrationNumber}/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="officeTelephone" float = "right" >Office Telephone Number</label>
                                            <input type="name" className="form-control" id="officeTelephone"
                                                   placeholder="Office Telephone Number" onChange={this.handlerChange} name="officeNumber" value={this.state.officeNumber}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="mobileNumber">Mobile Number</label>
                                            <input type="text" className="form-control" id="mobileNumber"
                                                   placeholder="Mobile Number" name= "mobileNumber" onChange={this.handlerChange} value={this.state.mobileNumber}/>
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <button type="submit" className="btn btn-primary" >Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </Paper>
                    </Grid>
                </div>
            </div>
        );
    }
}
