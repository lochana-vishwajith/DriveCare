import React from 'react'
import Navbar from "../../../navbarComponent/navbar";
import Footer from "../../../Footer/Footer";
import axios from "axios";
import CardView from "../../../Cardview/Cardview";
import Modal from "react-bootstrap/Modal";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import TextArea from "devextreme-react/text-area";
import {toast} from "react-toastify";


export default class ViewRule extends React.Component{
constructor(props) {
    super(props);
    this.state={
        rules :[],
        show:false,
        popupVisible: false,
        uPoints:'',
        obj:'',
        uPop:false,
        gazetteno:'',
        comment:''

    }
}
    componentDidMount() {
        axios.get(`http://localhost:9000/rules/${this.props.match.params.id}`).then((res) => {
            console.log("res : ", res.data);
            this.setState({ rules: res.data });

            const obj = res.data[0];
            this.setState({obj})
            console.log("resobj",obj);
        });
    }

    handlerModelCancel =() =>{
        this.setState({popupVisible:false});
    }

    handlerModelCancels =() =>{
        this.setState({uPop:false});
    }

    handlerModelStart = () => {
        // this.setState({show:true});
        this.setState({ popupVisible: true });
    }

    handlerModelStarts = () => {
        // this.setState({show:true});
        this.setState({ uPop: true });
    }
    handlerUpdate = (e) =>{

    const dataSet={
        demeritPoints:this.state.uPoints
    }
    e.preventDefault();
        axios
            .put(`http://localhost:9000/rules/update/${this.props.match.params.id}`, dataSet)
            .then((response) => {
                console.log("Data:", response);
                alert('Success Fully updated')
               window.location = `/viewrules/${this.props.match.params.id}`;
            })
            .catch((error) => {
                console.log("Data not Retriewed", error);
                alert("Sorry Cannot update now")
            });

    }

    handlerDelete = (e) =>{


    const {comment,obj,gazetteno} = this.state;


        const{
            ruleNo,
                ruleName,
                description,
                gazetteNo,
                date,
                demeritPoints,
                fineAmount,
                RuleCategoryId,
                }= this.state.obj;


    let newobj ={
        deletedGazetteNo : gazetteno,
        comment : comment,
        ruleNo,
        ruleName,
        description,
        gazetteNo,
        date,
        demeritPoints,
        fineAmount,
        RuleCategoryId,

    }

        e.preventDefault();
        axios
            .delete(`http://localhost:9000/rules/delete/${this.state.obj._id}`)
            .then((response) => {
                console.log("Data:", response);
                alert('Success Fully deleted')
                axios
                    .post(`http://localhost:9000/deletedrules/todelterule`, newobj)
                    .then((response) => {
                        window.location = "/rulescategorylist"
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
            })
            .catch((error) => {
                console.log("Data not Retriewed", error);
                alert("Sorry Cannot update now")
            })
    }




    handlerChanged =(e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {


    const{rules,show} =this.state;
    let portal = `-RULE ${this.state.obj.ruleName} [${this.state.obj.ruleNo}]-`.toUpperCase();

        return (

            <div>
                <Navbar portal = {portal} topic1 = "RULES & CATEGORIES" topic2 = "ADMIN DASHBOARD" link1 = '/rulescategorylist' link2 = '/' />



                <Popup
                    visible={this.state.popupVisible}
                    onHiding={this.handlerModelCancel}
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
                                    <label htmlFor="Mobile"> ENTER DEMERITS POINTS</label>
                                    <input type="text" name = "uPoints"   className="form-control form-input-border" value={this.state.uPoints} onChange={this.handlerChanged}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col">
                                <div className="buttonHolder text-ligh pt-5">
                                    <button className="my-button text-center"  title="I'm Feeling Lucky" name="lucky" type="submit"
                                            id="btn_i text-light" ><b> UPDATE POINTS</b></button>
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
                    <form onSubmit={this.handlerDelete} className="form-body-rules">
                        <div className="row">
                            <div className="form-group form-part">
                                <label htmlFor="Comment">Comment</label>
                                <input type="text" className="form-control form-input-border"name ="comment" onChange={this.handlerChanged} value={this.state.comment}   />
                            </div>
                            <div className="form-group form-part">
                                <label htmlFor="gazzertNo">Gazzette Number</label>
                                <input type="text" className="form-control form-input-border"name ="gazetteno" onChange={this.handlerChanged} value={this.state.gazetteno}  />
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


                {rules.map((id) => (  <section className="p-5">
                    <div className="container">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-md p-5">
                                <p className="lead">
                                    <b> RULE NAME  - {id.ruleName} </b>
                                    <br></br>
                                    <b> RULE NUMBER - {id.ruleNo}</b>
                                    <br></br>
                                    <b> GAZETTE NUMBER -  {id.gazetteNo} </b>
                                    <br></br>
                                    <b> FINE AMOUNT  -  {id.fineAmount}</b>
                                    <br></br>
                                </p>

                            </div>

                            <div className="col-md p-5">

                                    <p className="lead">
                                        <b>  ADDED DATE - {id.date} </b>
                                        <br></br>
                                        <br></br>
                                        <b>DESCRIPTION - {id.description}</b>
                                     </p>
                            </div>

                        </div>

                        <row className="align-items-center justify ">

                            <p className="lead text-center ">
                                <b><h3>NUMBER OF DEMERIT POINTS -  {id.demeritPoints} </h3></b>
                            </p>

                        </row>


                    </div>
                    <hr/>

                </section>
                ))}

               <center> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5" role="group" aria-label="...">
                    <button className="btn btn-outline-secondary text-light px-5 mx-5" type="button"
                            id="button-addon2" onClick={ this.handlerModelStart}>Update
                    </button>

                    <button className="btn btn-outline-secondary text-light px-5" type="button"
                            id="button-addon2" onClick={ this.handlerModelStarts} >Delete
                    </button>
                </div>
               </center>
<br></br> <br></br> <br></br> <br></br>
                <Footer/>



            </div>




        )
    }

}
