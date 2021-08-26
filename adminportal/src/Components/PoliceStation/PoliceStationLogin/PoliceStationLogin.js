import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import "./PolicestationLogin.css"
import Button from "../../ButtonComponent/button";
import Navbar from "../../CentralAdminComponent/navbarComponent/navbar";
import Footer from "../../Footer/Footer";


export default class PoliceStationLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            officeNo:'',
            password:''

        }
    }

    handlerChanged = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };


    handlerSubmit = (e) =>{
        e.preventDefault();
        const{officeNo,
            password} =this.state

        if(password =='kandy1' && officeNo == 'CPKY12224'){
            alert('SUCCESSFULLY SIGNED IN');
        }else{
            alert('WRONG PASSWORD PLEASE CONTACT ADMIN TO VERIFY YORE USER NAME AND PASSWORD ')
        }

        console.log('state',this.state);
    }

    handlerError = () =>{
        this.setState({ officeNo:'CPKY12224'})
        this.setState({ password:'HELLO'})

    }
    handlerSuccess = () =>{

        this.setState({ officeNo:'CPKY12224'})
        this.setState({ password:'kandy1'})
    }

    render() {
        return (

            <div>
                <Navbar portal = "-POLICE STATION LOGIN-" topic1 = "POLICE STATION LOGIN" topic2 = "VIEW ADMIN DETAILS" link1 = "/policelogin" link2 ="/viewAdminDetails"/>

                <div className="container">
                    <form className="form-body-rules p-2 " onSubmit={this.handlerSubmit}></form>
                    <div className="row">

                        <div className="form-group pt-5 form-part" >
                            <label htmlFor="username">OFFICE ID</label>
                            <input type="text" className="form-control form-input-border"name ="officerNo" onChange={this.handlerChanged} value={this.state.officeNo} required={true}/>
                        </div>


                    </div>

                    <div className="row">
                        <div className="form-group pt-1 form-part" >
                            <label htmlFor="username">PASSWORD</label>
                            <input type="password" className="form-control form-input-border"name ="password" value = {this.state.password} onChange={this.handlerChanged}/>
                        </div>

                    </div>


                    <br></br>
                    <br></br>

                    <center><button className="btn btn-outline-secondary text-light" type="button"
                                    id="button-addon2"
                                    onClick={this.handlerSubmit}
                    >LOGIN
                    </button></center>

                </div>



                <br></br>
                <br></br>
                <br></br>
                <br></br><br></br><br></br><br></br><br></br>
                <div className="btn-group-vertical">
                    <button type="button" className="btn btn-danger" onClick={this.handlerError}>DEMO ERROR</button>
                    <button type="button" className="btn btn-primary" onClick={this.handlerSuccess}>DEMO SUCCESS</button>
                </div>
                <Footer/>
            </div>
        );
    }
}
