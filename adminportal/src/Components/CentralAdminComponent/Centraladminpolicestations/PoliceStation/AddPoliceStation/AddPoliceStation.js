import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import Button from "../../../../ButtonComponent/button";
import Navbar from "../../../../navbarComponent/navbar";
import Footer from "../../../../Footer/Footer";
import axios from "axios";

/**
 *
 * <div>
 <div className="container">
 <div className="mt-1">
 <center>
 <div className="d-reg">
 <i>Welcome to</i>
 </div>
 <div className="d-dc">
 <b>DriveCare Police Station Add</b>
 </div>
 </center>
 <hr></hr>
 </div>
 <Grid>
 <Paper elevation={20}>
 <div className="d-center-form">


 <form onSubmit={this.handlerSubmit}>
 <div className="row">
 <div className="col">
 <label htmlFor="registrationNo">Registration Number</label>
 <input type="text" className="form-control" placeholder="Registration Number"
 onChange={this.handlerChange} aria-label="registrationNo" name = "registrationNo" id="registrationNo" value={this.state.registrationNo}/>
 </div>
 <div className="col">
 <label htmlFor="officeNumber">Office Number</label>
 <input type="text" className="form-control" placeholder="Office Number"
 onChange={this.handlerChange} aria-label="officeNumber" id="officeNumber" name = "office_Number" value={this.state.office_Number}/>
 </div>
 </div>
 <div className="form-group">
 <label htmlFor="workstation_Address">Address</label>
 <input type="text" className="form-control" id="workstation_Address"
 onChange={this.handlerChange} placeholder="Address" name="workstation_Address" value={this.state.workstation_Address}/>
 </div>
 <div className="form-group">
 <label htmlFor="email">Email</label>
 <input type="text" className="form-control" id="email"
 onChange={this.handlerChange}  placeholder="Email"  name ="email" value={this.state.email} />

 </div>
 <div className="form-row">
 <div className="form-group col-md-6">
 <label htmlFor="mobile_Number">Telephone</label>
 <input type="text" className="form-control" onChange={this.handlerChange} id="mobile_Number" name = "mobile_Number" placeholder="Telephone Number" value={this.state.mobile_Number}/>
 </div>
 <br></br>
 <div className="form-group col-md-6">
 <label htmlFor="station_grade">Station Category</label>
 <select onChange={this.handlerChange} className="custom-select custom-select-sm" id="station_grade"  name ="station_grade" value={this.state.station_grade}>
 <option selected>Open this select menu</option>
 <option value="1">One</option>
 <option value="2">Two</option>
 <option value="3">Three</option>
 </select>
 </div>
 </div>
 <br></br>
 <div className="form-row">
 <div className="form-group col-md-6">
 <label htmlFor="password" >Password</label>
 <input type="password" className="form-control" id="password"
 placeholder="Password" name="password" onChange={this.handlerChange} value={this.state.password}/>
 </div>
 <div className="form-group col-md-6">
 <label htmlFor="rPassword">Re-Enter Password</label>
 <input type="password" className="form-control" id="rPassword"
 placeholder="Re-Enter Password" name= "rPassword" onChange={this.handlerChange} value={this.state.rPassword}/>
 </div>
 <br/>
 </div>
 <div className="col-md-12 text-center">
 <button  type="submit" className="btn btn-primary">Add Police Station</button>
 </div>
 </form>


 </div>
 </Paper>
 </Grid>
 </div>
 </div>
 */



export default class PoliceStationLogin extends Component {
    constructor(props) {
        super(props);

        this.state ={
            registrationNo: '',
            email:'',
            workstation_Address:'',
            mobile_Number:'',
            office_Number:'',
            password:'',
            station_grade:'',
            rPassword:''
        }
    }

    handlerSubmit = (e) =>{
        e.preventDefault();
        if(this.state.password == this.state.rPassword){

            const{
                registrationNo,
                email,
                workstation_Address,
                mobile_Number,
                office_Number,
                password,
                station_grade
            } = this.state;

            const station = {
                registrationNo,
                email,
                workstation_Address,
                mobile_Number,
                office_Number,
                password,
                station_grade
            };
            axios
                .post(`http://localhost:9000/policeStation/hashedpost`, station)
                .then((response) => {
                    alert("Police Station Added");
                    window.location = "/policestationList"
                })
                .catch((error) => {
                    console.log(error.message);
                });


        }
        else {
                alert('CHECK THE PASSWORD AND RE-ENTER PASSWORD AND TRY AGAIN ')
        }


    }

    handlerError =() =>{
        this.setState({ registrationNo :'KKB-1234' });
        this.setState({email: 'Kundasalepolice@gmail.com' });
        this.setState({workstation_Address:'KundasaleBalagolla@gmail.com'  });
        this.setState({mobile_Number:'0712345678'});
        this.setState({office_Number: '0812456731' });
        this.setState({password:'password' });
        this.setState({station_grade:'A'  });
        this.setState({rPassword:'PASWORDWEFDFS'  });

    }
    handlerChange=(e)=>{

        this.setState({ [e.target.name]: e.target.value });

    }

    handlerSuccess = () =>{
        this.setState({ registrationNo :'KKB-1234' });
        this.setState({email: 'Kundasalepolice@gmail.com' });
        this.setState({workstation_Address:'KundasaleBalagolla@gmail.com'  });
        this.setState({mobile_Number:'0712345678'});
        this.setState({office_Number: '0812456731' });
        this.setState({password:'password1' });
        this.setState({station_grade:'A'  });
        this.setState({rPassword:'password1'});
    }



    render() {
        return (
            <div>
                <div className="div">
                    <Navbar portal = "-ADD POLICE STATIONS-" topic1 = "POLICE STATIONS" topic2 = "DASHBOARD" link1 ="/AddPoliceStation" link2 ="/dashboard"/>
                </div>

                <form action="#" className="form-body-rules" onSubmit={this.handlerSubmit}>
                    <div className="row">
                        <div className="col">
                            <div className="form-group form-part" >
                                <label htmlFor="RegistrationNumber">REGISTRATION NUMBER</label>
                                <input placeholder= "ENTER REGISTRATION NUMBER" type="text" onChange={this.handlerChange} value={this.state.registrationNo} name="registrationNo" className="form-control form-input-border" required={true}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group form-part">
                                <label htmlFor="station_grade">GRADE</label>
                                <select name="station_grader" id="station_grade" className="form-control form-input-border"name ="station_grade" value={this.state.station_grade} placeholder="SELECT GRADE" onChange={this.handlerChange} >
                                    <option selected>Open this select menu</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                </select>
                            </div>
                        </div>
                    </div>


                    <div className="form-group pt-1 form-part" >
                        <label htmlFor="workstation_Address">POLICE STATION ADDRESS</label>
                        <input type="text" className="form-control form-input-border" placeholder= "ENTER POLICE STATION ADDRESS"  name = "workstation_Address" onChange={this.handlerChange} id="workstation_Address" value={this.state.workstation_Address} required={true}/>
                    </div>


                    <div className="form-group pt-1 form-part" >
                        <label htmlFor="username">EMAIL</label>
                        <input type="text" className="form-control form-input-border" placeholder= "ENTER OFFICE ADDRESS" name ="email" onChange={this.handlerChange} value={this.state.email} required ={true}/>
                    </div>


                    <div className="row">
                        <div className="col">
                            <div className="form-group form-part" >
                                <label htmlFor="RegistrationNumber">OFFICE TELEPHONE</label>
                                <input type="text" onChange={this.handlerChange} value={this.state.office_Number} placeholder= "ENTER OFFICE TELEPHONE"  name="office_Number" className="form-control form-input-border" required={true}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group form-part" >
                                <label htmlFor="Mobile">HOTLINE</label>
                                <input type="text" placeholder="ENTER HOTLINE" name= "mobile_Number" onChange={this.handlerChange} value={this.state.mobile_Number} className="form-control form-input-border" required={true}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="form-group form-part" >
                                <label htmlFor="RegistrationNumber">PASSWORD</label>
                                <input type="password"placeholder="ENTER PASSWORD" name="password" onChange={this.handlerChange} value={this.state.password} className="form-control form-input-border" required={true}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="form-group form-part" >
                                <label htmlFor="Mobile">RE-ENTER PASSWORD</label>
                                <input type="password" placeholder="ENTER PASSWORD AGAIN" onChange={this.handlerChange} name="rPassword" value={this.state.rPassword} className="form-control form-input-border" required={true}/>
                            </div>
                        </div>
                    </div>


                    <div className="buttonHolder text-ligh pt-5">
                        <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"
                                id="btn_i text-light"><b>ADD POLICE STATION</b></button>
                    </div>

                </form>


                <div className="btn-group-vertical">
                    <button type="button" className="btn btn-danger" onClick={this.handlerError}>DEMO ERROR</button>
                    <button type="button" className="btn btn-primary" onClick={this.handlerSuccess}>DEMO SUCCESS</button>
                </div>

                <Footer/>
            </div>
        );
    }
}
