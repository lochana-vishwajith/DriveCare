import axios from "axios";
import React, { Component } from "react";
import Navbar from "../navbarComponent/navbar";
import Footer from "../Footer/Footer";
import jsPDF from "jspdf";

export default class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report:'',
        };
    }

    componentDidMount() {
        axios
            .get(`http://localhost:9000/report/`)
            .then((result) => {
                console.log("Data:", result.data);
                this.setState({ report: result.data });
            })
            .catch((error) => {
                console.log("Data not Retriewed", error);
            });
    }
    handlerPdf = (stations,drivers,officers,rules) =>{
        function createPDF(stations,drivers,officers,rules) {

        }

        this.createPDF(stations,drivers,officers,rules);
    };


    createPDF = async (stations,drivers,officers,rules) =>{


        const unit = "pt";
        const size = "A4"; //page size
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF( orientation , unit , size ); //create document
        const image = "https://res.cloudinary.com/iplus/image/upload/v1632764773/1629491743966_DriveCare_bnkiqs.png";


//stations,drivers,officers,rules

        const title = `summary report `.toUpperCase();
        const station = ` Number of Police Stations: ${stations} `.toUpperCase();
        const driver = `registered DRivers : ${drivers} `.toUpperCase();
        const officer = `registered traffic officers: ${officers} `.toUpperCase();
        const rule = `numver of rules: ${rules} `.toUpperCase();

        const left = 30;
        const top = 8;
        const imgWidth = 100;
        const imgHeight = 100;
        const lefts = 500;
        const tops = 300;
        const imgWidths = 300;
        const imgHeights = 300;
        doc.setFontSize( 20 );
        doc.text (title, 180,70);
        doc.text (station, 160,200);
        doc.text(driver, 160 ,270);
        doc.text(officer , 160,340);
        doc.text(rule, 160,410);


        doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);

        alert('Please Wait Processing the Report');
        doc.save ("summary report.pdf")
    }

    render() {
        const { report } = this.state;
        return (
            <div>

                <Navbar portal ="-SUMMARY REPORTS-" topic1 = "SUMMARY REPORTS" topic2 = "DELETED RULES" topic3="DASHBOARD" link1 ="/report"  link2 = "/deletedRules" link3 = "/dashboard" />
                <hr />



                    <div className="container"style={{paddingTop:"20vh"}}>
                        <div className="row">
                            <div className="col">
                                <div className="card border-danger" style={{borderWidth:"1px",boxShadow: "2px 3px 15px 5px"}}>
                                    <div className="card-body">
                                        <h1 className="card-title"><b>SUMMARY REPORT</b></h1>
                                        <br></br> <br/>
                                        <h3 className="card-text">NUMBER OF POLICE STATIONS REGISTERED : - {report.stations}</h3>
                                        <br/><br/>
                                        <h3 className="card-text">NUMBER OF DRIVERS REGISTERED : - {report.drivers}</h3>
                                        <br/><br/>
                                        <h3 className="card-text">NUMBER OF TRAFFIC OFFICERS REGISTERED : - {report.officers}</h3>
                                        <br/>
                                        <h3 className="card-text">NUMBER OF RULES ADDED : - {report.rules}</h3>
                                        <br/>
                                        <br></br>
                                    </div>
                                    <div style={{paddingBottom:"2vh"}}>
                                    <center>
                                        <button  className="btn btn-outline-danger" onClick = {()=>this.handlerPdf(report.stations,report.drivers,report.officers,report.rules)}>Generate Report</button>
                                    </center>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                <div style={{paddingTop:"30vh"}}>
                    <Footer/>
                </div>

            </div>
        );
    }
}
