import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import "./Centraladmin.css"
import Button from "../../ButtonComponent/button";
import Navbar from "../../navbarComponent/navbar";
import Footer from "../../Footer/Footer";
import axios from "axios";

export default class PoliceStationLogin extends Component {
    constructor(props) {
        super(props);
        this.state ={
            name:'',
            nicNumber:'',
            email:'',
            workstation:'',
            mobileNumber:'',
            officeAddress:'',
            officeNumber:'',
            officerRegistrationNumber:'',
            adminDetails:'',
            id:''
        }

    }

    handlerSubmit = (e) =>{
        e.preventDefault();

        if(this.state.mobileNumber.trim().length ==10){
            console.log(this.state);
            const{name,
                nicNumber,
                email,
                workstation,
                mobileNumber,
                officeAddress,
                officeNumber,
                officerRegistrationNumber} =this.state

            const admin = {name,
                nicNumber,
                email,
                workstation,
                mobileNumber,
                officeAddress,
                officeNumber,
                officerRegistrationNumber
            }
            axios
                .put(`http://localhost:9000/adminDetails/updateadmin/${this.state.id}`, admin)
                .then((response) => {
                    console.log("Data:", response);
                    alert('Success Fully updated')
                    window.location = `/centralAdminAdd`;
                })
                .catch((error) => {
                    console.log("Data not Retriewed", error);
                    alert("Sorry Cannot update now")
                });


        }else{

            alert('PHONE NUMBERS SHOULD BE LENGTH OF 10');
        }

    }

    componentDidMount() {
        axios
            .get(`http://localhost:9000/adminDetails/getcentraladmin`)
            .then((result) => {
                console.log("Data:", result.data);
                this.setState({ adminDetails: result.data[0] });
                this.setState({     nicNumber:result.data[0].nicNumber,
                    email:result.data[0].email,
                    workstation:result.data[0].workstation,
                    mobileNumber:result.data[0].mobileNumber,
                    officeAddress:result.data[0].officeAddress,
                    officeNumber:result.data[0].officeNumber,
                    officerRegistrationNumber:result.data[0].officerRegistrationNumber,
                    name:result.data[0].name,id:result.data[0]._id},
                    )

            })
            .catch((error) => {
                console.log("Data not Retriewed", error);
            });
    }

    handlerChange=(e)=>{

        this.setState({ [e.target.name]: e.target.value });

    }
    handlerError = () =>{
      // this.setState({nicNumber:'983089336V'})
        this.setState({name:'Lakindu Wishwajith'})
        this.setState({email:'lakindu@gmail.com'})
        this.setState({workstation:'Kandy-1234'})
        this.setState({mobileNumber:'0712433657'})
        this.setState({officerRegistrationNumber:'IT123442'})
        this.setState({officeAddress:'Kandy'})
        this.setState({officeNumber:'0812433657'})
    }
    handlerSuccess =() =>{
        this.setState({name:'Lakindu Wishwajith'})
        this.setState({nicNumber:'983089336V'})
        this.setState({email:'lakindu@gmail.com'})
        this.setState({workstation:'Kandy-1234'})
        this.setState({mobileNumber:'0712433657'})
        this.setState({officerRegistrationNumber:'Kandy-123442BY'})
        this.setState({officeAddress:'Kandy'})
        this.setState({officeNumber:'0812433657'})
    }
    render() {
        const{ adminDetails} =this.state;
        return (
            <div>
            <div className="div">
                <Navbar portal = "-ADD MY DETAILS-" topic1 = "UPDATE DETAILS" topic2 = "VIEW MY DETAILS" topic3 = "DASHBOARD" link1 = "/centralAdminAdd" link3 = "/dashboard"  link2= "/viewAdminDetails" />
            </div>

        <form action="#" className="form-body-rules" onSubmit={this.handlerSubmit}>
            <div className="row">
                <div className="col">
                    <div className="form-group form-part" >
                        <label htmlFor="RegistrationNumber">EMPLOYEE ID</label>
                        <input placeholder= "ENTER EMPLOYEE ID" type="text" onChange={this.handlerChange} value={this.state.officerRegistrationNumber} name="officerRegistrationNumber" className="form-control form-input-border" required={true}/>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group form-part" >
                        <label htmlFor="nicNumber">NATIONAL ID</label>
                        <input type="text" placeholder= "ENTER NATIONAL ID" id="nicNumber" onChange={this.handlerChange} name = "nicNumber" value={this.state.nicNumber} className="form-control form-input-border" required={true}/>
                    </div>
                </div>
            </div>


            <div className="form-group pt-1 form-part" >
                <label htmlFor="username">NAME</label>
                <input type="text" className="form-control form-input-border" placeholder= "ENTER NAME"  name = "name" onChange={this.handlerChange} id="name" value={this.state.name} required={true}/>
            </div>


            <div className="form-group pt-1 form-part" >
                <label htmlFor="username">OFFICE ADDRESS</label>
                <input type="text" className="form-control form-input-border" placeholder= "ENTER OFFICE ADDRESS" name ="officeAddress" onChange={this.handlerChange} value={this.state.officeAddress}/>
            </div>


            <div className="row">
                <div className="col">
                    <div className="form-group form-part" >
                        <label htmlFor="RegistrationNumber">EMAIL</label>
                        <input type="text" onChange={this.handlerChange} value={this.state.email} placeholder= "ENTER EMAIL"  name="email" className="form-control form-input-border"/>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group form-part" >ENTER
                        <label htmlFor="Mobile">MOBILE</label>
                        <input type="text" placeholder="ENTER MOBILE NUMBER" name= "mobileNumber" onChange={this.handlerChange} value={this.state.mobileNumber} className="form-control form-input-border"/>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <div className="form-group form-part" >
                        <label htmlFor="RegistrationNumber">OFFICE NUMBER</label>
                        <input type="text"placeholder="ENTER ID NUMBER OF OFFICE" name="workstation" onChange={this.handlerChange} value={this.state.workstation} className="form-control form-input-border"/>
                    </div>
                </div>
                <div className="col">
                    <div className="form-group form-part" >
                        <label htmlFor="Mobile">OFFICE TELEPHONE</label>
                        <input type="text" placeholder="ENTER OFFICE TELEPHONE" onChange={this.handlerChange} name="officeNumber" value={this.state.officeNumber} className="form-control form-input-border"/>
                    </div>
                </div>
            </div>


            <div className="buttonHolder text-ligh pt-5">
                <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"
                        id="btn_i text-light"><b> Submit </b></button>
            </div>

        </form>
                <div className="btn-group-vertical">
                    <button type="button" className="btn btn-danger" onClick={this.handlerError}>DEMO ERROR</button>
                    <button type="button" className="btn btn-primary" onClick={this.handlerSuccess}>DEMO SUCCESS</button>
                </div>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Footer/>
            </div>
        );
    }
}
