import React from 'react'
import {Grid, Paper} from "@material-ui/core";
import "./addRule.css"
import CButton from "../../../ButtonComponent/button"
export default class AddRules extends React.Component{
    constructor(props) {
        super(props);

        this.state = {

            ruleNo:'',
            ruleName:'',
            description:'',
            gazetteNo:'',
            date:'',
            demeritPoints:'',
            fineAmount:'',
            RuleCategoryId:''


        }
    }


    render() {
        return (
            <div>
                <div className="container">
                    <div className="mt-1">
                        <center>
                            <div className="d-reg">
                                <i>Welcome to</i>
                            </div>
                            <div className="d-dc">
                                <b>Rules Add</b>
                            </div>
                        </center>
                        <hr></hr>
                    </div>
                    <Grid>
                        <Paper elevation={20}>
                            <div className="d-center-form">
                                <form>
                                    <div className="row">
                                        <div className="raw">
                                            <label htmlFor="categoryName"> ruleNo</label>
                                            <input type="text" className="form-control" placeholder="Category Name"
                                                   aria-label="categoryName" name = "categoryName" id="categoryName"/>
                                            <br/>
                                        </div>
                                        <br/>
                                        <div className="raw">
                                            <label htmlFor="categoryNumber">ruleName</label>
                                            <input type="text" className="form-control" placeholder="Category Number"
                                                   aria-label="categoryNumber" id="categoryNumber" name = "categoryNumber"/>
                                            <br/>
                                        </div>

                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">description</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                                  rows="3"></textarea>
                                    </div>
                                    <br/>


                                        <div className="raw">
                                            <label htmlFor="categoryName">gazetteNo</label>
                                            <input type="text" className="form-control" placeholder="Category Name"
                                                   aria-label="categoryName" name = "categoryName" id="categoryName"/>
                                        </div>
                                    <br/>
                                        <div className="raw">
                                            <label htmlFor="categoryNumber">fineAmount</label>
                                            <input type="text" className="form-control" placeholder="Category Number"
                                                   aria-label="categoryNumber" id="categoryNumber" name = "categoryNumber"/>
                                        </div>
                                    <br/>
                                        <div className="col form-group col-md-2 col-centered" >
                                            <label htmlFor="categoryNumber" class className="col-sm-2 col-form-label" >demeritPoints</label>
                                            <input type="number"max className="form-control" placeholder="max"
                                                   aria-label="max" id="max" name = "max"/>
                                        </div>
                                    <br/>

                                        <div className="form-check col-md-2 col-centered">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                                <label className="form-check-label" htmlFor="exampleCheck1">ADMIN ACCEPTED </label>
                                        </div>
                                    <br/>
                                    <div className="col text-center">

                                    <button type="button" className="btn btn-primary">Primary</button>
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