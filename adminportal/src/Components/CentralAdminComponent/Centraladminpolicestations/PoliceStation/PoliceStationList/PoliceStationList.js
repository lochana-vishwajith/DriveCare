import React from 'react'
import {Grid, Paper} from "@material-ui/core";
import axios from "axios";
import Navbar from "../../../../navbarComponent/navbar";
import Footer from "../../../../Footer/Footer";
import Modal from "react-bootstrap/Modal";

/*
*             <div>
                <div className="container">
                    <label className="OfficerDetaisDis">
                        <h2>
                            <b>Traffic Officer Details</b>
                        </h2>
                    </label>
                    <hr />

                    <div className="officerdisplayDiv">
                        <Grid>
                            <Paper elevation={20}>
                                <div className="officerDetailsDisplay">
                                    <table class="table table-striped table-hover">
                                        <thead>
                                        <tr className="table-dark">
                                            <th scope="col">registrationNo</th>
                                            <th scope="col">email</th>
                                            <th scope="col">workstation_Address</th>
                                            <th scope="col">mobile_Number</th>
                                            <th scope="col">office_Number</th>
                                            <th scope="col">station_grade</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {stationDetails.map((office) => (
                                            <tr className="table-light">
                                                <td>{office.registrationNo}</td>
                                                <td>{office.email}</td>
                                                <td>{office.workstation_Address}</td>
                                                <td>{office.mobile_Number}</td>
                                                <td>{office.office_Number}</td>
                                                <td>{office.station_grade}</td>
                                                <td className="btnCol">
                                                    <i
                                                        className="far fa-eye fa-lg"
                                                        onClick={this.aaa}
                                                        id="offView"
                                                    />
                                                </td>
                                                <td className="btnCol">
                                                    <p className="fas fa-pencil-alt fa-lg" view />
                                                </td>
                                                <td className="btnCol">
                                                    <i className="fas fa-trash fa-lg" />
                                                </td>
                                            </tr>
                                        ))}

                                        </tbody>

                                    </table>
                                        <button className="btn btn-primary" type="button">Add PoliceStation</button>
                                </div>
                            </Paper>
                        </Grid>
                        <div className="policeCenterDisplay"></div>
                    </div>
                </div>
            </div>this.state ={
        show:false
    }
*
* */



export default class PoliceStationList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            stationDetails: [],
            search:''
        };
    }

    componentDidMount() {
        axios.get("http://localhost:9000/policeStation/getAllPoliceStations").then((res) => {
            console.log("res : ", res);
            this.setState({ stationDetails: res.data });
        });
    }

    handlerAdd =() =>{

        window.location = '/AddPoliceStation';
    }

    handlerChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });

    }


    handlerSearch = () => {
        window.location = `/viewpolicesearch/${this.state.search}`
    }
    render() {
        const { stationDetails} = this.state;
        return (<div>


                <Navbar portal = "-POLICE STATION LIST-" topic1 = "POLICE STATION" topic2 = "DASHBOARD" link1 ="/policestationList" link2 ="/" />


                <section className=" text-light p-2 sec1-color">

                    <div className="container">

                        <div className="row ">
                            <div className="col-8">
                            </div>
                            <div className="col-4">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control"
                                           placeholder="Enter Registration Number"
                                           name = "search" value={this.state.search}
                                            onChange={this.handlerChange}
                                    />/>
                                    <button className="btn btn-outline-secondary text-light" type="button"
                                            id="button-addon2"
                                            onClick={this.handlerSearch}
                                    >Search Button
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </section>
                <br></br>

                {stationDetails.map((office) => (

                <div className="card p-5">
                    <div className="card-body card border-dark mb-3 card-body-cus">
                            <div className="row">
                                <td><h1><b>{office.registrationNo}</b></h1></td>
                                <div className="col-8">
                                    <p className="lead">
                                        <br></br>
                                        <b> EMAIL - {office.email}</b>
                                        <br></br>
                                        <b>ADDRESS - {office.workstation_Address}</b>
                                        <br></br>
                                        <b>TELEPHONE - {office.mobile_Number}</b>
                                        <br></br>
                                        <b>MOBILE NUMBER - {office.office_Number}</b>
                                        <br></br>
                                        <b>GRADE - {office.station_grade}</b>


                                    </p>
                                </div>

                                <div className="col-4" border>
                                        <p className="lead">
                                            <button className="btn btn-outline-secondary text-light px-5" type="button"
                                                    id="button-addon2" pt-5>View
                                            </button>
                                        </p>
                                </div>
                            </div>
                    </div>
                </div>

            ))}

            <hr/>
                <center> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5" role="group" aria-label="...">
                    <button className="btn btn-outline-secondary text-light px-5 mx-5" type="button"
                            id="button-addon2" onClick={ this.handlerAdd}>ADD POLICE STATION
                    </button>
                </div>
                </center>
            <Footer/>
            </div>

        );
    }


}
