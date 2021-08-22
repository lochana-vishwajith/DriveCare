import React from 'react'
import {Grid, Paper} from "@material-ui/core";
import axios from "axios";

export default class PoliceStationList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            stationDetails: [],
        };
    }

    componentDidMount() {
        axios.get("http://localhost:9000/policeStation/getAllPoliceStations").then((res) => {
            console.log("res : ", res);
            this.setState({ stationDetails: res.data });
        });
    }
/*"registrationNo": "CPKY12224",
        "email": "kandypolice@gmail.com",
        "workstation_Address": "No 2 Kandy Police Station",
        "mobile_Number": "0712345436",
        "office_Number": "081234567",
        "password": "kandy",
        "station_grade": "A",
        "__v": 0*/
    render() {
        const { stationDetails } = this.state;
        return (
            <div>
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

                                        <tr>
                                            <div className="d-grid gap-2">
                                                <button className="btn btn-primary" type="button">Add PoliceStation</button>
                                            </div>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Paper>
                        </Grid>
                        <div className="policeCenterDisplay"></div>
                    </div>
                </div>
            </div>
        );
    }


}
