import React from 'react'
import Navbar from "../navbarComponent/navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";

export default class MyDeleteRequest extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            requestList: [],
        }
    }

    componentDidMount() {
        const stationID = localStorage.getItem("userid");
        axios.get(`http://localhost:9000/delpolice/${stationID}`).then((res) => {
            console.log("res : ", res);
            this.setState({ requestList: res.data });
        });
    }



    render() {
        const{requestList} =this.state
        const RulesPortalName =`-MY STATION REQUESTS -`.toUpperCase();
        return (
            <div>
                <div>
                    <Navbar topic1 = "DELETE REQUEST" portal = {RulesPortalName}  topic1 = "MY DELETE REQUEST" topic2 = "DASHBOARD" link1= "/myStationRequest" link2 ="/dashboard" />
<center>
                    {

                        (requestList.length == 0) && <h1 className="pt-5"><b>There is No Delete Requests Done by you</b></h1>}
</center>

                    {requestList.map((req) => (

                        <div className="card p-5">
                            <div className="card-body card border-dark mb-3 card-body-cus">
                                <div className="row">
                                    <td><h1><b>{req.registrationNo.toUpperCase()} - [{req.station_grade.toUpperCase()}]</b></h1></td>
                                    <div className="col-8">
                                        <p className="lead">
                                            <br></br>
                                            <b> COMMENT ON DELETION - {req.comment.toUpperCase()}</b>
                                            <br></br>
                                            <b>EMAIL ADDRESS - {req.email}</b>
                                            <br></br>
                                            <b>PHONE NUMBER - {req.mobile_Number}</b>
                                            <br></br>
                                            <br></br>
                                            {(req.Status=="Pending") &&<b>DATE ADDED - {req.DateInquired}</b>}
                                            <br></br>
                                            {(req.AdminComment != null) &&
                                            <b>ADMIN COMMENTS - {req.AdminComment}</b>}
                                            <br></br>
                                            <b>STATUS - {req.Status}</b>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}

                    <hr/>
                    <br></br>
                    <br></br><br></br>
                    <br></br><br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br><br></br>
                    <br></br><br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <Footer/>
                </div>
            </div>
        )
    }
}