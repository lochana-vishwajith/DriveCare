import React from 'react'
import {Grid, Paper} from "@material-ui/core";

export default class AddRuleCategories extends React.Component{

    constructor(props) {
        super(props);

        this.state={
            categoryName:'',
            categoryNumber:'',
            range:'',
            severity:'',
            description:''

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
                                <b>DriveCare Rules Category Add</b>
                            </div>
                        </center>
                        <hr></hr>
                    </div>
                    <Grid>
                        <Paper elevation={20}>
                            <div className="d-center-form">


                                <form>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="categoryName">Category Name</label>
                                            <input type="text" className="form-control" placeholder="Category Name"
                                                   aria-label="categoryName" name = "categoryName" id="categoryName"/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="categoryNumber">Category Number</label>
                                            <input type="text" className="form-control" placeholder="Category Number"
                                                   aria-label="categoryNumber" id="categoryNumber" name = "categoryNumber"/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Example textarea</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                                  rows="3"></textarea>
                                    </div>

                                    <div className="row">
                                        <div className="col form-group col-md-2">
                                            <label htmlFor="categoryName">Min</label>
                                            <input type="number" className="form-control" placeholder="min"
                                                   aria-label="min" name = "min" id="min"/>
                                        </div>
                                        <div className="col form-group col-md-2" >
                                            <label htmlFor="categoryNumber">Max</label>
                                            <input type="number"max className="form-control" placeholder="max"
                                                   aria-label="max" id="max" name = "max"/>
                                        </div>


                                    </div>
                                    <label htmlFor="categoryName">Seviarity</label>
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected>Open this select menu</option>
                                        <option value="1">High</option>
                                        <option value="2">Medium</option>
                                        <option value="3">Low</option>
                                    </select>


                                </form>


                            </div>
                        </Paper>
                    </Grid>
                </div>
            </div>
        );
    }







}