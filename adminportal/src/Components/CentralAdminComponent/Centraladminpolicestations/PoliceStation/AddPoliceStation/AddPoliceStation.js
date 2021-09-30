import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import Button from "../../../../ButtonComponent/button";
import Navbar from "../../../../navbarComponent/navbar";
import Footer from "../../../../Footer/Footer";
import axios from "axios";


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
        this.setState({ registrationNo :'KKG1234' });
        this.setState({email: 'Kundasalepolice@gmail.com' });
        this.setState({workstation_Address:'KundasaleBalagolla@gmail.com'  });
        this.setState({mobile_Number:'0712345678'});
        this.setState({office_Number: '0812456731' });
        this.setState({password:'hasitha' });
        this.setState({station_grade:'A'  });
        this.setState({rPassword:'hasitha'});
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
