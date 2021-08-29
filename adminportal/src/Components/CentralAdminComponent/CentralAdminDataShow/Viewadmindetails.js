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

                        <Navbar portal ="-ADMIN DETAILS-" topic1 = "ADMIN DETAILS" link1 ="/viewAdminDetails" topic2= "POLICE STATION LOGIN" link2 = "/policelogin" />
                        <hr />
                        <div className="container">
                            {adminDetails.map((item, index) => (
                                <div className=" text-center " key={index} >
                                    <div className="text-center">

                                        <div className = "row">
                                            <label><h1><b>Full Name</b></h1></label>
                                            <br />
                                            <b>
                                               <h1>{item.name}</h1>
                                            </b>
                                            <br />
                                            <label><h1><b>OFFICE NUMBER</b></h1></label>
                                            <br />
                                        <h1>{item.workstation}</h1>
                                            <br />
                                        <label><h1><b>NATIONAL IDENTITY CARD</b></h1></label>
                                            <br />
                                            <h1>{item.nicNumber}</h1>
                                            <br />
                                            <label><h1><b>EMAIL</b></h1></label>
                                            <br />
                                            <h1>{item.email}</h1>
                                            <br />
                                            <label><h1><b>MOBILE</b></h1></label>
                                            <br />
                                            <h1>{item.mobileNumber}</h1>
                                            <br />
                                            <label><h1><b>OFFICE ADDRESS</b></h1></label>
                                            <br />
                                            <h1>{item.officeAddress}</h1>
                                            <br/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                <br></br>
                <br></br>
                <Footer/>
                    </div>

        );
    }
}
