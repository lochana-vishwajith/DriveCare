import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Navbar from "../../navbarComponent/navbar";
import Footer from "../../Footer/Footer";

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

                        <Navbar portal ="-ADMIN DETAILS-" topic1 = "ADMIN DETAILS" topic3="DASHBOARD" link1 ="/viewAdminDetails" topic2= "UPDATE MY DETAILS" link2 = "/centralAdminAdd" link3 = "/dashboard" />
                        <hr />

                {adminDetails.map((item, index) => (

                <div className="container"style={{paddingTop:"20vh"}}>
                    <div className="row">
                        <div className="col">
                            <div className="card border-danger" style={{borderWidth:"1px",boxShadow: "2px 3px 15px 5px"}}>
                                <div className="card-body">
                                    <h1 className="card-title"><b>ADMIN INFO</b></h1>
                                    <br></br> <br/>
                                    <h3 className="card-text">{item.name.toUpperCase()}</h3>
                                    <br/><br/>
                                    <h3 className="card-text">{item.nicNumber.toUpperCase()}</h3>
                                    <br/><br/>
                                    <h3 className="card-text">OFFICE NUMBER : {item.workstation} </h3>
                                   <br/>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card border-danger" style={{borderWidth:"1px",boxShadow: "2px 3px 15px 5px"}}>
                                <div className="card-body">
                                    <h1 className="card-title"><b>ADMIN CONTACT DETAILS</b></h1>
                                    <br/><br/><br/>
                                    <h3 className="card-text">{item.email}</h3>
                                    <br/><br/>
                                    <h3 className="card-text">{item.mobileNumber}</h3>
                                    <br/><br/>
                                    <h3 className="card-text">{item.officeAddress.toUpperCase()}</h3>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>))}
                <div style={{paddingTop:"30vh"}}>
                    <Footer/>
                </div>

            </div>
        );
    }
}
