import React from 'react'
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";


export default class PoliceStationViewSearchResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stationDetails: [],
        };
    }
/*
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
        return(
            <div>

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

            </div>
        )
}
}