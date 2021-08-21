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
            station_grade:'',
            rPassword:''
        }
    }

    handlerSubmit = (e) =>{
        e.preventDefault();



    }

    handlerChange=(e)=>{

        this.setState({ [e.target.name]: e.target.value });

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


                                <form onSubmit={this.handlerSubmit}>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="registrationNo">Registration Number</label>
                                            <input type="text" className="form-control" placeholder="Registration Number"
                                                  onChange={this.handlerChange} aria-label="registrationNo" name = "registrationNo" id="registrationNo" value={this.state.registrationNo}/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="officeNumber">Office Number</label>
                                            <input type="text" className="form-control" placeholder="Office Number"
                                                   onChange={this.handlerChange} aria-label="officeNumber" id="officeNumber" name = "office_Number" value={this.state.office_Number}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="workstation_Address">Address</label>
                                        <input type="text" className="form-control" id="workstation_Address"
                                               onChange={this.handlerChange} placeholder="Address" name="workstation_Address" value={this.state.workstation_Address}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input type="text" className="form-control" id="email"
                                               onChange={this.handlerChange}  placeholder="Email"  name ="email" value={this.state.email} />

                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="mobile_Number">Telephone</label>
                                            <input type="text" className="form-control" onChange={this.handlerChange} id="mobile_Number" name = "mobile_Number" placeholder="Telephone Number" value={this.state.mobile_Number}/>
                                        </div>
                                        <br></br>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="station_grade">Station Category</label>
                                            <select onChange={this.handlerChange} className="custom-select custom-select-sm" id="station_grade"  name ="station_grade" value={this.state.station_grade}>
                                                <option selected>Open this select menu</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="password" >Password</label>
                                            <input type="password" className="form-control" id="password"
                                                   placeholder="Password" name="password" onChange={this.handlerChange} value={this.state.password}/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="rPassword">Re-Enter Password</label>
                                            <input type="password" className="form-control" id="rPassword"
                                                   placeholder="Re-Enter Password" name= "rPassword" onChange={this.handlerChange} value={this.state.rPassword}/>
                                        </div>
                                        <br/>
                                    </div>
                                    <div className="col-md-12 text-center">
                                    <button  type="submit" className="btn btn-primary">Add Police Station</button>
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
