import React from 'react'
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
            dreqcomment:'',
            office_Number:'',
            mobile_Number:'',
            workstation_Address:'',
            email:'',
            password:'',
            passwordchange:false,
            showtextbox:true
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



    handlerModelCanceled =() =>{
        this.setState({popupVisible:false,});
    }
    handlerModelStarted = () => {
        this.setState({ popupVisible: true,office_Number:this.state.obj.office_Number,
            mobile_Number:this.state.obj.mobile_Number,
            workstation_Address:this.state.obj.workstation_Address,
            email:this.state.obj.email });
    }




    handlerDelete = (e) => {

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
    handlerUpdate = (e) => {

        e.preventDefault();
        const{
            office_Number,
            mobile_Number,
            workstation_Address,
            email,password}=this.state

        const dataSet ={
            office_Number,
            mobile_Number,
            workstation_Address,
            email,
        }
        const stationID = localStorage.getItem("userid");
        axios

            .put(`http://localhost:9000/policeStation/updatepol/${stationID}`, dataSet)
            .then((response) => {
                console.log("Data:", response);
                alert('Success Fully updated')
                window.location = `/myStation`;
            })
            .catch((error) => {
                console.log("Data not Retriewed", error);
                alert("Sorry Cannot update now")
            });



    }

    handlerClicked =(e)=>{
      if(e.target.checked && this.state.showtextbox==true){
          this.setState({showtextbox:false});
      }
      if(this.state.showtextbox == false){
          this.setState({showtextbox:true});
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
                    <form onSubmit={this.handlerDelete} className="form-body-rules">
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
                                            id="btn_i text-light" ><b> </b>REQUEST DELETE</button>
                                </div>
                            </div>
                        </div>

                    </form>

                </Popup>




                <Popup
                    visible={this.state.popupVisible}
                    onHiding={this.handlerModelCanceled}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title="Update THE RULE"
                    container=".dx-viewport"
                    width={700}
                    height={600}
                >
                    <Position
                        at="center"
                        my="center"
                        of={this.state.positionOf}
                    />
                    <form onSubmit={this.handlerUpdate} className="form-body-rules">
                        <div className="row">
                            <div className="form-group form-part">
                                <label htmlFor="Comment">Email</label>
                                <input type="text" className="form-control form-input-border" onChange={this.handlerChanged} name ="email" value = {this.state.email}  />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group form-part">
                                <label htmlFor="Comment">TELEPHONE</label>
                                <input type="text" className="form-control form-input-border" onChange={this.handlerChanged} name ="office_Number" value = {this.state.office_Number}  />
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group form-part">
                                <label htmlFor="Comment">HOTLINE</label>
                                <input type="text" className="form-control form-input-border" onChange={this.handlerChanged} name ="mobile_Number" value = {this.state.mobile_Number}  />
                            </div>
                        </div> <div className="row">
                        <div className="form-group form-part">
                            <label htmlFor="Comment">WORK ADDRESS</label>
                            <input type="text" className="form-control form-input-border" onChange={this.handlerChanged} name ="workstation_Address" value = {this.state.workstation_Address}  />
                        </div>
                    </div>
                        <div className="row">

                            <div className="col">
                                <div className="buttonHolder text-ligh pt-5">
                                    <button className="my-button text-center"  title="I'm Feeling Lucky" name="lucky" type="submit"
                                            id="btn_i text-light" ><b> UPDATE MY STATION</b></button>
                                </div>
                            </div>
                        </div>

                    </form>

                </Popup>



                <Navbar portal ={portal} topic1 = "POLICE STATIONS" topic2 = "DASHBOARD" topic3 = "MY DELETE REQUEST" link1="/policestationList" link2= "/" link3="/myStationRequest" />
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
                            <button className="btn btn-outline-success  px-5 mx-5" type="button"
                                    id="button-addon2" onClick={ this.handlerModelStarted}>REQUEST UPDATE
                            </button>
                        </div>
                            <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5 pt-5 col" role="group" aria-label="...">
                                <button className="btn btn-outline-danger px-5 mx-5" type="button"
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
