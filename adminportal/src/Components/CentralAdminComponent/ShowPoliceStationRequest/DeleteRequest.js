import React from 'react'
import Navbar from "../../navbarComponent/navbar";
import Footer from "../../Footer/Footer";
import axios from "axios";


export default class DeletePoliceRequests extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            requestList: [],
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:9000/delpolice`).then((res) => {
            console.log("res : ", res);
            this.setState({ requestList: res.data });
        });
    }

    handlerView = (id) =>{

        window.location = `/viewpolicesearch/${id}`
    }

    render() {
        const{requestList} =this.state
        const RulesPortalName =`-POLICE STATION REQUESTS -`.toUpperCase();
        return (
            <div>
                <div>
                    <Navbar topic1 = "DELETE REQUEST" portal = {RulesPortalName} topic2 ="UPDATE REQUEST"  topic3 = "DASHBOARD" link3= "/" link1 ="/" LINK2="/"/>
                    /                    {/*{RulesInList.map((rules) => (*/}
                    {/*    <CardView title = {rules.ruleName}  bty = "rule" description ={rules.description} cid ={rules.ruleNo} prid = {rules._id}/>*/}
                    {/*))}*/}

                    {requestList.map((req) => (

                        <div className="card p-5">
                            <div className="card-body card border-dark mb-3 card-body-cus">
                                <div className="row">
                                    <td><h1><b>{req.registrationNo.toUpperCase()} - [{req.station_grade.toUpperCase()}]</b></h1></td>
                                    <div className="col-8">
                                        <p className="lead">
                                            <br></br>
                                            <b> COMMENT ON DELETION- {req.comment.toUpperCase()}</b>
                                            <br></br>
                                            <b>EMAIL ADDRESS- {req.email}</b>
                                            <br></br>
                                            <b>PHONE NUMBER - {req.mobile_Number}</b>
                                            <br></br>
                                            <br></br>
                                            <p className="lead">
                                                <button className="btn btn-outline-secondary text-light px-5" type="button"
                                                        id="button-addon2" onClick={() =>this.handlerView(req.registrationNo)} pt-5>View
                                                </button>
                                            </p>
                                        </p>
                                    </div>

                                    <div className="col-4" border>


                                        <p className="lead">
                                            <button className="btn btn-outline-secondary text-light px-5" type="button"
                                                    id="button-addon2" onClick={() =>this.handlerView(req._id)} pt-5>Accept
                                            </button>
                                        </p>

                                        <p className="lead">
                                            <button className="btn btn-outline-secondary text-light px-5" type="button"
                                                    id="button-addon2" onClick={() =>this.handlerView(req._id)} pt-5>Decline
                                            </button>
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
                    <Footer/>
                </div>
            </div>
        )
    }
}