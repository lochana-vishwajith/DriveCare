import React from 'react'
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Navbar from "../navbarComponent/navbar";
import Footer from "../Footer/Footer";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import AuthContext from "../../Reducer/UseReducer";



export default class MyStation extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            stationDetails: [],
            obj:"",
            show:false,
            popupVisible: false,
            uPop:false,
            dreqcomment:''


        };


    }

    handlerChanged = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handlerModelCancels =() =>{
        this.setState({uPop:false});
    }
    handlerModelStart = () => {
        this.setState({ uPop: true });
    }

    handlerUpdate = (e) => {

        e.preventDefault();
        const{_id,registrationNo,email,mobile_Number,station_grade,officers
        } =this.state.obj

        if(officers.length>0){

            alert('more than 1 officer You Cant request to delete when active officers are working in the system.');
        }else{
            const{dreqcomment}=this.state

            const redobj = {

                PidD :_id,registrationNo,email,mobile_Number,station_grade,comment:dreqcomment
            }

            alert(redobj.PidD+redobj.registrationNo+redobj.mobile_Number+redobj.comment);
            axios.post('http://localhost:9000/delpolice/deletereq',redobj).then(e => {
                 alert(e.data);
                 alert('Added Sucess');
                this.setState({uPop:false});
                }
            )
            .catch(err =>{
                console.log(err.error);
                alert(e.error);
            })




        }


    }


        componentDidMount() {
        const stationID = localStorage.getItem("userid");
        axios
            .get(`http://localhost:9000/policeStation/my/${stationID}`)
            .then((result) => {
                console.log("Data:", result.data[0]);
                this.setState({ stationDetails: result.data });
                this.setState({obj:result.data[0]})
                console.log(this.state.stationDetails);
            })
            .catch((error) => {
                console.log("Data not Retrieved", error);
            });
    }

    render() {
        const {stationDetails} =this.state;
        const portal = `-MY STATION ${this.state.obj.registrationNo}-`.toUpperCase();

        return(
            <div>

                <Popup
                    visible={this.state.uPop}
                    onHiding={this.handlerModelCancels}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title="DELETE THE RULE"
                    container=".dx-viewport"
                    width={500}
                    height={500}
                >
                    <Position
                        at="center"
                        my="center"
                        of={this.state.positionOf}
                    />
                    <form onSubmit={this.handlerUpdate} className="form-body-rules">
                        <div className="row">
                            <div className="form-group form-part">
                                <label htmlFor="Comment">Comment</label>
                                <input type="text" className="form-control form-input-border" onChange={this.handlerChanged} name ="dreqcomment" value = {this.state.dreqcomment}  />
                            </div>
                        </div>


                        <div className="row">

                            <div className="col">
                                <div className="buttonHolder text-ligh pt-5">
                                    <button className="my-button text-center"  title="I'm Feeling Lucky" name="lucky" type="submit"
                                            id="btn_i text-light" ><b> DELETE RULE</b></button>
                                </div>
                            </div>
                        </div>

                    </form>

                </Popup>




                <Popup
                    visible={this.state.uPop}
                    onHiding={this.handlerModelCancels}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title="DELETE THE RULE"
                    container=".dx-viewport"
                    width={500}
                    height={500}
                >
                    <Position
                        at="center"
                        my="center"
                        of={this.state.positionOf}
                    />
                    <form onSubmit={this.handlerUpdate} className="form-body-rules">
                        <div className="row">
                            <div className="form-group form-part">
                                <label htmlFor="Comment">Comment</label>
                                <input type="text" className="form-control form-input-border" onChange={this.handlerChanged} name ="dreqcomment" value = {this.state.dreqcomment}  />
                            </div>
                        </div>


                        <div className="row">

                            <div className="col">
                                <div className="buttonHolder text-ligh pt-5">
                                    <button className="my-button text-center"  title="I'm Feeling Lucky" name="lucky" type="submit"
                                            id="btn_i text-light" ><b> DELETE RULE</b></button>
                                </div>
                            </div>
                        </div>

                    </form>

                </Popup>



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
                        <center><div className="row"> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5 pt-5 col" role="group" aria-label="...">
                            <button className="btn btn-outline-secondary text-light px-5 mx-5" type="button"
                                    id="button-addon2" onClick={ this.handlerModelStart}>REQUEST UPDATE
                            </button>
                        </div>
                            <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5 pt-5 col" role="group" aria-label="...">
                                <button className="btn btn-outline-secondary text-light px-5 mx-5" type="button"
                                        id="button-addon2" onClick={ this.handlerModelStart}>REQUEST DELETE
                                </button>
                            </div>
                        </div>
                        </center>


                    </section>

                ))}
                <Footer/>
            </div>
        )
    }
}