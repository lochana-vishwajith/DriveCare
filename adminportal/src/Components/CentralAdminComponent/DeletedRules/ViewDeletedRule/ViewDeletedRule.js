import React from 'react'
import Navbar from "../../../navbarComponent/navbar";
import Footer from "../../../Footer/Footer";
import axios from "axios";
import CardView from "../../../Cardview/Cardview";
import Modal from "react-bootstrap/Modal";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import TextArea from "devextreme-react/text-area";
import {toast} from "react-toastify";
import jsPDF from "jspdf"
import {Button} from "@material-ui/core";

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




    createPDF = async (date,description,deletedDate,deletedGazetteNo,comment,ruleName,fineAmount,demeritPoints) =>{
                console.log(description);
        console.log(deletedDate);

        alert(date);
        const unit = "pt";
        const size = "A4"; //page size
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF( orientation , unit , size ); //create document
        const noteduetoreports =`DEMERITS POINTS :  ${demeritPoints}`;
        const title = `GAZZETE NUMBER OF DELETED RULE ${deletedGazetteNo} `;
        const suggesion = ` DELETED DATE: ${deletedDate} `;
        const medicine = `COMMENTS ON DELETEION: ${comment} `;
        const othernote = `DESCRIPTION OF THE RULE: ${description} `;
        const doctar = `RULE NAME: ${ruleName} `;

         const left = 30;
        const top = 8;
        const imgWidth = 100;
        const imgHeight = 100;
        const lefts = 500;
        const tops = 300;
        const imgWidths = 300;
        const imgHeights = 300;
        doc.setFontSize( 20 );
        doc.text (title, 40,150);
        doc.text (doctar, 150,80);
        doc.text(suggesion, 60 ,250);
        doc.text(medicine, 60,300);
        doc.text( othernote, 60,350);
        doc.text(noteduetoreports, 60,400);
        alert('Ok');
        doc.save ("deletedRule.pdf")
    }


    handlerPdf = (date,description,deletedDate,deletedGazetteNo,comment,ruleName,fineAmount,demeritPoints) =>{
        function createPDF(date, description, deletedDate, deletedGazetteNo, comment, ruleName, fineAmount, demeritPoints) {

        }

        this.createPDF(date,description,deletedDate,deletedGazetteNo,comment,ruleName,fineAmount,demeritPoints);
    };







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
                    <Button variant="outline-dark" onClick = {()=>this.handlerPdf(obj.date,obj.description,obj.deletedDate,obj.deletedGazetteNo,obj.comment,obj.ruleName,obj.fineAmount,obj.demeritPoints)}>Generate Report</Button>
                </center>
                <br></br> <br></br> <br></br> <br></br>
                <Footer/>



            </div>




        )
    }

}
