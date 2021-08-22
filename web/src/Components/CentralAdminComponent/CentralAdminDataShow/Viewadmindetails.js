import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";


export default class Viewadmindetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adminDetails: [],
        };
    }

    componentDidMount() {
        axios
            .get(`http://localhost:9000/adminDetails/getcentraladmin`)
            .then((result) => {
                console.log("Data:", result.data);
                this.setState({ adminDetails: result.data });
            })
            .catch((error) => {
                console.log("Data not Retriewed", error);
            });
    }
    render() {
        const { adminDetails } = this.state;
        return (
            <div>
                <div className="container text-center card-body">
                    <div >
                        <label>
                            <h2>
                                <b>Admin Details</b>
                            </h2>
                        </label>
                        <hr />
                        <div className="card text-center card-text-central">
                            {adminDetails.map((item, index) => (
                                <div className=" text-center " key={index} >
                                    <div className="text-center">
                                        <label>
                                            <h3>Basic Info</h3>
                                            <hr></hr>
                                        </label>
                                        <div className="ml-2">
                                            <label>Full Name</label>
                                            <br />
                                            <b>
                                                {item.name}
                                            </b>
                                            <br />
                                            <label>OFFICE</label>
                                            <br />
                                            <b>{item.workstation}</b>
                                            <br />
                                            <label>NIC NUMBER</label>
                                            <br />
                                            <b>{item.nicNumber}</b>
                                            <br />
                                            <label>OFFICE REGISTRATION NUMBER</label>
                                            <br />
                                            <b>{item.officerRegistrationNumber}</b>
                                            <br />
                                            <label>Email</label>
                                            <br />
                                            <b>{item.email}</b>
                                            <br />
                                            <label>Mobile</label>
                                            <br />
                                            <b>{item.mobileNumber}</b>
                                            <br />
                                            <label>Office Address</label>
                                            <br />
                                            <b>{item.officeAddress}</b>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
