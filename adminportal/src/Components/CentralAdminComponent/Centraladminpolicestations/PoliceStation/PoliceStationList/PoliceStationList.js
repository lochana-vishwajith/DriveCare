import React from 'react'
import axios from "axios";
import Navbar from "../../../../navbarComponent/navbar";
import Footer from "../../../../Footer/Footer";


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

    OnViewHandler=(id)=>{
        window.location = `/viewpolicesearch/${id}`

    }
    render() {
        const { stationDetails} = this.state;
        return (<div>


                <Navbar portal = "-POLICE STATION LIST-" topic1 = "POLICE STATION" topic2 = "DASHBOARD" topic3 = "POLICE STATION REQUESTS" link1 ="/policestationList" link2 ="/dashboard"  link3 ="/preqs"/>


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
                                            <button className="btn btn-outline-secondary text-light px-5" type="button" onClick={() => this.OnViewHandler(office.registrationNo)}


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
