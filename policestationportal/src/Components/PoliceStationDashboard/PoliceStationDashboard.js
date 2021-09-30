import React from 'react'
import Navbar from "../navbarComponent/navbar";
import Footer from "../Footer/Footer";
import {Link} from 'react-router-dom'
//Admin dashboard
//commit to check
export default class AdminDashboard extends React.Component {
    handlerMyreqs = (e) =>{
        e.preventDefault();
        window.location = '/myStationRequest'
    }

    render() {
        return(<div>

                <Navbar portal = "-POLICE STATION DASHBOARD-" topic1 ="DASHBOARD" link1 = "/" topic2 = "LOGOUT" link2 = "/"/>
                <div className="container">
                    <div className="row">

                        <div className="col p-5">

                            <div className="card card-body-cus-pan" >
                                <div className="card-body">
                                    <h5 className="card-title">MY STATION</h5>
                                    <p className="card-text">MANAGE RULES AND CATEGORIES OF THE APPLICATION VIEW THE RULES OF THE APPLICATION.</p>
                                    <center><button className="btn btn-danger" type="button"
                                                    id="button-addon2"
                                    ><Link to="/myStation">CLICK TO</Link>
                                    </button></center>
                                </div>
                            </div>
                        </div>
                        <div className="col p-5">

                            <div className="card ">
                                <div className="card-body">
                                    <h5 className="card-title">TRAFFIC OFFICERS</h5>
                                    <p className="card-text">ADD POLICE STATIONS MANAGE POLICE STATIONS AND VIEW POLICE STATION DETAILS</p>
                                    <center><button className="btn btn-danger" type="button"
                                                    onClick={this.handlerSubmit}
                                    ><Link to="/display">CLICK TO</Link>
                                    </button></center>
                                </div>
                            </div>

                        </div>


                    </div>
                    <div className="row">

                        <div className="col p-5">
                            <div className="card card-body-cus-pan pt-5">
                                <div className="card-body">
                                    <h5 className="card-title">MY REQUESTS</h5>
                                    <p className="card-text">UPDATE  DETAILS.</p>
                                    <center><button className="btn btn-danger" type="button" onClick={this.handlerMyreqs}
                                                    id="button-addon2"
                                    >MY DELETE REQUEST
                                    </button></center>
                                </div>
                            </div>
                        </div>
                        <div className="col p-5">

                            <div className="card card-body-cus-pan pt-5">
                                <div className="card-body">
                                    <h5 className="card-title">REPORTS</h5>
                                    <p className="card-text">CREATE REPORTS VIEW REPORTS AND CREATE SUMMARY DETAILS</p>
                                    <center><button className="btn btn-danger" type="button"
                                                    id="button-addon2"

                                    ><Link to="/">CLICK TO</Link>
                                    </button></center>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <Footer/>
            </div>

        )
    }
}





