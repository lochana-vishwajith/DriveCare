import React from 'react'
import {Grid, Paper} from "@material-ui/core";
import "./addRule.css"
import navbar from "../../../navbarComponent/navbar";
import CButton from "../../../ButtonComponent/button"
import example from "../../examp";
import Navbar from "../../../navbarComponent/navbar";
import Footer from "../../../Footer/Footer";
import axios from "axios";
export default class AddRules extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            ruleNo:'',
            ruleName:'',
            description:'',
            gazetteNo:'',
            demeritPoints:'',
            fineAmount:'',
            RuleCategoryId:this.props.match.params.id
        }

    }
    handlerSubmit = (e) =>{
        e.preventDefault();
        const {
            ruleNo,
            ruleName,
            description,
            gazetteNo,
            demeritPoints,
            fineAmount,
            RuleCategoryId
        }=this.state

        const dpoints = parseInt(this.state.demeritPoints)
        if(dpoints>0 && dpoints<50){
            const rule = {
                ruleNo,
                ruleName,
                description,
                gazetteNo,
                demeritPoints,
                fineAmount,
                RuleCategoryId
            }

            axios
                .post(`http://localhost:9000/rules/fullrule`, rule)
                .then((response) => {
                    alert("Rule Added");
                    window.location = "/rulescategorylist"
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }else {
            alert('Doesnt validated');
        }



    }

    handlerChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });



    }

    handlerError=()=>{

        this.setState({ ruleNo:'pkl-3241'});
        this.setState({ description:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text'});
        this.setState({ gazetteNo:'331-234'});
        this.setState({ demeritPoints:'3'});
        this.setState({ fineAmount:'100.00'});


    }
    handlerSuccess = () =>{
        this.setState({ ruleNo:'pkl-3241'});
        this.setState({ ruleName:'Town Speed Violation'});
        this.setState({ description:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text'});
        this.setState({ gazetteNo:'331-234'});
        this.setState({ demeritPoints:'3'});
        this.setState({ fineAmount:'100.00'});

    }


    render() {
        const portal =`-ADD RULES-`
        return (
            <div>
                <Navbar portal = {portal}  topic1 = "RULES & CATEGORIES"  topic2 = "DASHBOARD" link2 ="/dashboard" link1 ="/rulescategorylist"  />
                <form action="#" className=" p-1" onSubmit={this.handlerSubmit}>

                    <section className="mt-0">
                        <div className="container">
                            <div className="row align-items-center justify-content-between" >
                                <div className="col-md p-2">
                                    <div className="form-group form-part">
                                        <label htmlFor="email"><h3>RULE NAME</h3></label>
                                        <input type="text" className="form-control form-input-border"name ="ruleName"  placeholder="RULE NAME" value={this.state.ruleName} required={true} onChange={this.handlerChange}/>
                                    </div>
                                    <div className="form-group form-part">
                                        <label htmlFor="email"><h3>GAZETTE NUMBER</h3></label>
                                        <input type="text" className="form-control form-input-border"name ="gazetteNo" placeholder="GAZETTE NUMBER" value={this.state.gazetteNo} required={true} onChange={this.handlerChange} />
                                    </div>

                                    <div className="form-group form-part">
                                        <label htmlFor="email"><h3>RULE NUMBER</h3></label>
                                        <input type="text" className="form-control form-input-border"name ="ruleNo" placeholder="RULE NUMBER" value={this.state.ruleNo} required={true} onChange={this.handlerChange} />
                                    </div>
                                </div>

                                <div className="col-md p-1">

                                    <p className="lead">
                                        <div className="form-group form-part">
                                            <br/>
                                            <label htmlFor="description"><h3>DESCRIPTION</h3></label>
                                            <textarea name="description" id="description" cols="30" rows="10" value={this.state.description} placeholder="DESCRIPTION" className="form-control border-b form-input-border" required={true} onChange={this.handlerChange}></textarea>
                                        </div>
                                    </p>
                                </div>

                            </div>

                            <row className="align-items-center justify ">

                                <p className="lead text-center ">
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group form-part" >
                                                <label htmlFor="RegistrationNumber"><h3>FINE AMOUNT</h3></label>
                                                <input type="text" name="fineAmount" value={this.state.fineAmount} placeholder="FINE AMOUNT" className="form-control form-input-border" onChange={this.handlerChange} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group form-part" >
                                                <label htmlFor="Mobile"><h3>DEMERITS POINTS</h3></label>
                                                <input type="text" name = "demeritPoints"  value = {this.state.demeritPoints} placeholder="DEMERITS POINTS" className="form-control form-input-border" onChange={this.handlerChange}/>
                                            </div>
                                        </div>
                                    </div>
                                </p>

                            </row>


                        </div>
                        <hr/>
                        <center> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5 pt-5" role="group" aria-label="...">
                            <button className="btn btn-outline-secondary text-light px-5 mx-5" type="submit"
                                    id="button-addon2">ADD RULE
                            </button>
                        </div>
                        </center>
                    </section>
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