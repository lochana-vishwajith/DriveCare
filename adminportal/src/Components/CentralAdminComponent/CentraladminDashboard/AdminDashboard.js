import React from 'react'
import Navbar from '../../navbarComponent/navbar'
import Footer from "../../Footer/Footer";
import "./Dashboard.css"

//Admin dashboard
//commit to check
export default class AdminDashboard extends React.Component {

    handlerReport=()=>{

        window.location='/deletedRules';
    }

    handlerPoliceStation=()=>{

        window.location='/policestationList';
    }


    handlerMyDetails=()=>{

        window.location='/centralAdminAdd';
    }



    handlerRulesAndCat=()=>{

        window.location='/rulescategorylist';
    }



    render() {
        return(<div>

                <Navbar portal = "-ADMIN DASHBOARD-" topic1 ="DASHBOARD" link1 = "/" topic2 = "LOGOUT" link2 = "/adminLogin"/>
                <div className="container">
         <div className="row">

             <div className="col p-5">

                 <div className="card card-body-cus-pan" >
                     <div className="card-body">
                         <h5 className="card-title">RULES & CATEGORIES</h5>
                         <p className="card-text">MANAGE RULES AND CATEGORIES OF THE APPLICATION VIEW THE RULES OF THE APPLICATION.</p>
                         <center><button className="btn btn-outline-secondary text-light" type="button"
                                         id="button-addon2"
                         onClick={this.handlerRulesAndCat}>CLICK
                         </button></center>
                     </div>
                 </div>
             </div>
             <div className="col p-5">

                 <div className="card card-body-cus-pan">
                     <div className="card-body">
                         <h5 className="card-title">POLICE STATIONS</h5>
                         <p className="card-text">ADD POLICE STATIONS MANAGE POLICE STATIONS AND VIEW POLICE STATION DETAILS</p>
                         <center><button className="btn btn-outline-secondary text-light" type="button"
                                         id="button-addon2"
                                         onClick={this.handlerPoliceStation}
                         >CLICK
                         </button></center>
                     </div>
                 </div>

             </div>


         </div>
                <div className="row">

                    <div className="col p-5">
                        <div className="card ">
                            <div className="card-body">
                                <h5 className="card-title">MY DETAILS</h5>
                                <p className="card-text">UPDATE ADMIN DETAILS.</p>
                                <br/>
                                <center><button className="btn btn-outline-secondary text-light" type="button"
                                                id="button-addon2"
                                                onClick={this.handlerMyDetails} >CLICK
                                </button></center>
                            </div>
                        </div>
                    </div>
                    <div className="col p-5">

                        <div className="card">
                            <div className="card-body"  >
                                <h5 className="card-title">REPORTS & DELETED RULES</h5>
                                <p className="card-text">CREATE REPORTS VIEW REPORTS AND CREATE SUMMARY DETAILS</p>
                                <br></br>
                                    <center><button className="btn btn-outline-secondary text-light" type="button"
                                                id="button-addon2" onClick={this.handlerReport}
                                >CLICK
                                </button></center>
                            </div>
                        </div>
                    </div>


                </div>



            </div>
                <Footer/>
            </div>

        )
    }
}





