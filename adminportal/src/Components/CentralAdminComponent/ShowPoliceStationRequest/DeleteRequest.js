import React from 'react'
import Navbar from "../../navbarComponent/navbar";
import Footer from "../../Footer/Footer";
import axios from "axios";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";

export default class DeletePoliceRequests extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            requestList: [],
            show:false,
            popupVisible: false,
            uPop:false,
            dreqcomment:'',
            id:''
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:9000/delpolice`).then((res) => {
            console.log("res : ", res);
            this.setState({ requestList: res.data });
        });
    }

    handlerUpdate = (e) =>{

        const dataSet={
            AdminComment:this.dreqcomment,
            Status:"DECLINED"
        }
        e.preventDefault();
        axios
            .put(`http://localhost:9000/delpolice/update/${this.state.id}`, dataSet)
            .then((response) => {
                console.log("Data:", response);
                alert('Sucess fully Commented')
                window.location = `/preqs`;
            })
            .catch((error) => {
                console.log("Data not Retriewed", error);
                alert("Sorry Cannot update now")
            });

    }



    handlerChanged = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handlerModelCancels =() =>{
        this.setState({popupVisible:false});
    }

    handlerModelStart = (id) => {

        this.setState({id});
        alert(this.state.id);
        this.setState({ popupVisible: true });
    }


    handlerView = (id) =>{

        window.location = `/viewpolicesearch/${id}`
    }

    handlerAccept =(id,Pid)=>{

        const dataSet ={
            Status:"ACCEPTED"
        }
        axios
            .delete(`http://localhost:9000/policeStation/deletepolice/${Pid}`)
            .then((response) => {
                console.log("Data:", response);
                axios
                    .put(`http://localhost:9000/delpolice/update/${id}`,dataSet)
                    .then((response) => {
                        console.log("Data:", response);
                    })
                    .catch((error) => {
                        console.log("Data not Retriewed", error);
                        alert("Sorry Cannot update now")
                    });

            })
            .catch((error) => {
                console.log("Data not Retriewed", error);
                alert("Sorry Cannot update now")
            })
        alert("The Police Station SuccessFully Deleted");




    }

    handlerDecline=(id)=>{

        alert(id);

    }

    render() {
        const{requestList} =this.state
        const RulesPortalName =`-POLICE STATION REQUESTS -`.toUpperCase();
        return (
            <div>


                <Popup
                    visible={this.state.popupVisible}
                    onHiding={this.handlerModelCancels}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title="UPDATE POINTS"
                    container=".dx-viewport"
                    width={300}
                    height={280}
                >
                    <Position
                        at="center"
                        my="center"
                        of={this.state.positionOf}
                    />
                    <form onSubmit={this.handlerUpdate} className="form-body-rules">
                        <div className="row">
                            <div className="col">
                                <div className="form-group form-part" >
                                    <label htmlFor="Mobile">Comment</label>
                                    <input type="text" name = "dreqcomment"   className="form-control form-input-border" value={this.state.dreqcomment} onChange={this.handlerChanged}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col">
                                <div className="buttonHolder text-ligh pt-5">
                                    <button className="my-button text-center"  title="I'm Feeling Lucky" name="lucky" type="submit"
                                            id="btn_i text-light" ><b> DECLINE</b></button>
                                </div>
                            </div>
                        </div>

                    </form>

                </Popup>

                <div>
                    <Navbar topic1 = "DELETE REQUEST" portal = {RulesPortalName} topic1 ="DELETE REQUEST"  topic2 = "DASHBOARD" link2= "/" link1 = "/preqs"/>
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
                                            {(req.Status=="Pending") &&<b>DATE ADDED-{req.DateInquired}</b>}
                                            <br></br>
                                            <b>STATUS-{req.Status}</b>
                                        </p>
                                    </div>
                                    {(req.Status=="Pending") &&
                                    <div className="col-4" border>

                                        <p className="lead">
                                            <button className="btn btn-outline-secondary text-light px-5" type="button"
                                                    id="button-addon2" onClick={() =>this.handlerAccept(req._id,req.PidD)} pt-5>Accept
                                            </button>
                                        </p>

                                        <p className="lead">
                                            <button className="btn btn-outline-secondary text-light px-5" type="button"
                                                    id="button-addon2" onClick={() =>this.handlerModelStart(req._id)} pt-5>Decline
                                            </button>
                                        </p>
                                    </div>}

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