import React from 'react'
import Navbar from "../../../navbarComponent/navbar";
import Footer from "../../../Footer/Footer";
import axios from "axios";
import CardView from "../../../Cardview/Cardview";
import Modal from "react-bootstrap/Modal";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import TextArea from "devextreme-react/text-area";
import {toast} from "react-toastify";


export default class ViewDeletedRule extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            obj:'',


        }
    }
    componentDidMount() {
        axios.get(`http://localhost:9000/deletedrules/${this.props.match.params.id}`).then((res) => {
            console.log("res : ", res.data);
            this.setState({ rules: res.data });

            const obj = res.data[0];
            this.setState({obj})
            console.log("resobj",obj);
        });
    }
    render() {


        const{obj} =this.state;
        let portal = `-RULE ${this.state.obj.ruleName} [${this.state.obj.ruleNo}]-`.toUpperCase();

        return (

            <div>
                <Navbar portal = {portal} topic1 = "RULES & CATEGORIES" topic2 = "ADMIN DASHBOARD" link1 = '/rulescategorylist' link2 = '/' />
                 <section className="p-5">
                        <div className="container">
                            <div className="row align-items-center justify-content-between">
                                <div className="col-md p-5">
                                    <p className="lead">
                                        <b> RULE NAME  - {obj.ruleName} </b>
                                        <br></br>
                                        <br></br>
                                        <b> RULE NUMBER - {obj.ruleNo}</b>
                                        <br></br>
                                        <br></br>
                                        <b> GAZETTE NUMBER -  {obj.gazetteNo} </b>
                                        <br></br>
                                        <br></br>
                                        <b> FINE AMOUNT  -  {obj.fineAmount}</b>
                                        <br></br>
                                        <br></br>
                                        <b>NUMBER OF DEMERIT POINTS -  {obj.demeritPoints} </b>
                                        <br></br>
                                        <br></br>
                                    </p>

                                </div>

                                <div className="col-md p-5">

                                    <p className="lead">
                                        <b>  ADDED DATE - {obj.date} </b>
                                        <br></br>
                                        <br></br>
                                        <b>DESCRIPTION - {obj.description}</b>
                                        <br></br>
                                        <br></br>
                                       <b>DELETED DATE- {obj.deletedDate}</b>
                                        <br></br>
                                        <br></br>
                                        <b>GAZETTE NUMBER For DELETION- {obj.deletedGazetteNo}</b>
                                        <br></br>
                                        <br></br>
                                        <b>COMMENT - {obj.comment} </b>
                                        <br></br>
                                        <br></br>
                                    </p>

                                </div>

                            </div>




                        </div>
                        <hr/>

                    </section>


                <center>
                    <button className="btn btn-outline-secondary text-light px-5" type="button"
                            id="button-addon2" onClick={ this.handlerModelStarts} >Delete
                    </button>
                </center>
                <br></br> <br></br> <br></br> <br></br>
                <Footer/>



            </div>




        )
    }

}
