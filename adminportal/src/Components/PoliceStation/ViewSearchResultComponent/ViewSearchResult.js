import React from 'react'
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Navbar from "../../CentralAdminComponent/navbarComponent/navbar";
import Footer from "../../Footer/Footer";


export default class PoliceStationViewSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stationDetails: [],
        };
    }
    /*<div>

                    <div className="card">
                        <h5 className="card-header">Featured</h5>
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                                { stationDetails.map((item, index) => (
                                    <div className=" text-center " key={index} >
                                        <div className="text-center">
                                            <label>
                                                <h3>Basic Info</h3>
                                                <hr></hr>
                                            </label>
                                            <div className="ml-2">
                                                <label>registrationNo</label>
                                                <br />
                                                <b>
                                                    {item.registrationNo}
                                                </b>
                                                <br />
                                                <label>email</label>
                                                <br />
                                                <b>{item.mobile_Number}</b>
                                                <br />
                                                <label>workstation_Address</label>
                                                <br />
                                                <b>{item.workstation_Address}</b>
                                                <br />
                                                <label>mobile_Number</label>
                                                <br />
                                                <b>{item.officerRegistrationNumber}</b>
                                                <br />
                                                <label>Email</label>
                                                <br />
                                                <b>{item.email}</b>
                                                <br />
                                                <label>station_grade</label>
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
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>

    *
    * "officers": [],
            "_id": "611812b456128f531cc0186e",
            "registrationNo": "CPKY12224",
            "email": "kandypolice@gmail.com",
            "workstation_Address": "No 2 Kandy Police Station",
            "mobile_Number": "0712345436",
            "office_Number": "081234567",
            "password": "kandy",
            "station_grade": "A",
            "__v": 0
    *
    *
    * */
    componentDidMount() {
        axios
            .get(`http://localhost:9000/policeStation/${this.props.match.params.id}`)
            .then((result) => {
                console.log("Data:", result.data);
                this.setState({ stationDetails: result.data });
                console.log(this.state.stationDetails);
            })
            .catch((error) => {
                console.log("Data not Retrieved", error);
            });
    }

    render() {
        const {stationDetails} =this.state;
        const portal = `-POLICE STATION [${this.props.match.params.id}]-`
        return(
            <div>
                <Navbar portal ={portal} topic1 = "POLICE STATIONS" topic2 = "DASHBOARD" link1="/policestationList" link2= "/" />
                { stationDetails.map((id, index) => (<section className="p-5">
                        <div className="container">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-md p-5">
                                    <p className="lead">
                                        <b> REGISTRATION NUMBER  - {id.registrationNo} </b>
                                        <br></br>
                                        <b> GRADE - {id.station_grade}</b>
                                        <br></br>
                                        <b> EMAIL -  {id.email} </b>
                                        <br></br>

                                    </p>

                                </div>

                                <div className="col-md p-5">

                                    <p className="lead">
                                        <b> HOTLINE - {id.mobile_Number} </b>
                                        <br></br>
                                        <b>OFFICE TELEPHONE - {id.office_Number}</b>
                                    </p>
                                </div>

                            </div>

                            <row className="align-items-center justify ">

                                <p className="lead text-center ">
                                    <b><h3> WORKSTATION ADDRESS -  {id.workstation_Address} </h3></b>
                                </p>

                            </row>


                        </div>
                        <hr/>
                        <center> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5 pt-5" role="group" aria-label="...">
                            <button className="btn btn-outline-secondary text-light px-5 mx-5" type="button"
                                    id="button-addon2" onClick={ this.handlerModelStart}>View Requests
                            </button>
                        </div>
                        </center>


                    </section>

                ))}
                <Footer/>
            </div>
        )
    }
}