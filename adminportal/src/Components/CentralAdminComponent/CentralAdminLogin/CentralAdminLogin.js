import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import "./CentralAdminLogin.css"
import Button from "../../ButtonComponent/button";
import Navbar from "../navbarComponent/navbar";
import Footer from "../../Footer/Footer";
import {Route} from "react-router-dom";
export default class CentralAdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
                officerNo:'',
                password:''

        }
    }

    handlerChanged = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handlerError = () =>{
        this.setState({ officerNo:'IT19KB'})
        this.setState({ password:'HELLO'})

    }
    handlerSuccess = () =>{

        this.setState({ officerNo:'IT1911KB'})
        this.setState({ password:'hasitha'})
    }

    handlerSubmit = (e) =>{
        e.preventDefault();
        const{officerNo,
            password} =this.state

        if(password =='hasitha' && officerNo == 'IT1911KB'){
            alert('WELCOME ADMIN YOU\'VE SIGNED IN');
            window.location = '/'
        }else{
            alert('INVALID USER NAME OR PASSWORD')
        }

        console.log('state',this.state);
    }
    render() {
        return (

            <div>
                <Navbar portal = "-ADMIN LOGIN-" topic1 = "ADMIN LOGIN" link1 ="/adminLogin"/>

        <div className="container">
                <form className="form-body-rules p-2 " onSubmit={this.handlerSubmit}></form>
                <div className="row">

                    <div className="form-group pt-5 form-part" >
                        <label htmlFor="username">OFFICER ID</label>
                        <input type="text" className="form-control form-input-border"name ="officerNo" onChange={this.handlerChanged} value={this.state.officerNo} required={true}/>
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

            <center><button className="btn btn-outline-secondary text-light" type="submit"
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
