import React from 'react'
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Navbar from "../../../../navbarComponent/navbar";
import Footer from "../../../../Footer/Footer";


export default class PoliceStationViewSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stationDetails: [],
        };
    }

    handlerviewRequests



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


    handlerViewRequests = (id) =>{
        window.location = `/specificdreqs/${id}`
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
                                    id="button-addon2" onClick={ ()=>this.handlerViewRequests(id._id)}>View Requests
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