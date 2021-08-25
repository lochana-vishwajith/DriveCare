import React from 'react'
import {Grid, Paper} from "@material-ui/core";
import "./addRule.css"
import navbar from "../../navbarComponent/navbar";
import CButton from "../../../ButtonComponent/button"
import example from "../../examp";
import Navbar from "../../navbarComponent/navbar";
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
            RuleCategoryId:'',
            isAccepted:false


        }
    }
    handlerSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);

    }

    handlerChange=(e)=>{
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <Navbar topic1 = "Admin" topic2 = "lamaya" topic3 = "lamay2" link1 = "#admin" portal = "ADD RULES"/>
                <example portal = "ADD RULES"/>
                <div className="container">
                    <Grid>
                        <Paper elevation={20}>
                            <div className="d-center-form">
                                <form onSubmit={this.handlerSubmit}>
                                    <div className="row">
                                        <div className="raw">
                                            <label htmlFor="ruleNo">Rule Number</label>
                                            <input type="text" className="form-control" value ={this.state.ruleNo} onChange={this.handlerChange}  placeholder="Rule Number"
                                                   aria-label="categoryName" name = "ruleNo" id="ruleNo"/>
                                            <br/>
                                        </div>
                                        <br/>
                                        <div className="raw">
                                            <label htmlFor="ruleName">Rule Name</label>
                                            <input type="text" className="form-control" placeholder="Rule Name"
                                                   aria-label="categoryNumber" id="ruleName" value ={this.state.ruleName} onChange={this.handlerChange}  name = "ruleName"/>
                                            <br/>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" id="description" name ="description"
                                                  rows="3" value = {this.state.description} onChange={this.handlerChange}  ></textarea>
                                    </div>
                                    <br/>


                                        <div className="raw">
                                            <label htmlFor="gazetteNo">GazetteNo</label>
                                            <input type="text" className="form-control" placeholder="GazetteNo"
                                                   aria-label="gazetteNo" name = "gazetteNo" id="gazetteNo" onChange={this.handlerChange} value = {this.state.gazetteNo}/>
                                        </div>
                                    <br/>
                                        <div className="raw">
                                            <label htmlFor="fineAmount">Fine Amount</label>
                                            <input type="text" className="form-control" placeholder="Fine Amount"
                                                   aria-label="fineAmount" id="fineAmount" name = "fineAmount" onChange={this.handlerChange}  value = {this.state.fineAmount}/>
                                        </div>
                                    <br/>
                                        <div className="col form-group col-md-2 col-centered" >
                                            <label htmlFor="demeritPoints" class className="col-sm-2 col-form-label" >Demerit Points</label>
                                            <input type="number"max className="form-control" placeholder="Demerit Points"
                                                   aria-label="demeritPoints" id="demeritPoints" value = {this.state.demeritPoints} onChange={this.handlerChange}  name = "demeritPoints"/>
                                        </div>
                                    <br/>

                                    <label htmlFor="categoryName">Category Number</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="1">High</option>
                                        <option value="2">Medium</option>
                                        <option value="3">Low</option>
                                    </select>
                                    <br/>


                                        <div className="form-check col-md-2 col-centered">
                                            <input type="checkbox" className="form-check-input" id="adminAccept" onChange={this.handlerChange}  value={this.state.isAccepted} name ="isAccepted"/>
                                                <label className="form-check-label" htmlFor="adminAccept">ADMIN ACCEPTED </label>
                                        </div>
                                    <br/>
                                    <div className="col text-center">

                                    <button type="submit" className="btn btn-primary">Primary</button>
                                        </div>
                                </form>

                            </div>
                        </Paper>
                    </Grid>
                </div>
            </div>
        );
    }





}