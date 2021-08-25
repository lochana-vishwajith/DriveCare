import React from 'react'
import {Grid, Paper} from "@material-ui/core";
import "./AddRulesCategories.css"
export default class AddRuleCategories extends React.Component{


    /*    <div>
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


                                <form onSubmit={this.handlerSubmit}>
                                    <div className="row">
                                        <div className="col">
                                            <label htmlFor="categoryName">Category Name</label>
                                            <input type="text" className="form-control" placeholder="Category Name"
                                                   onChange={this.handlerChange} aria-label="categoryName" name = "categoryName" id="categoryName" value={this.state.categoryName}/>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="categoryNumber">Category Number</label>
                                            <input type="text" className="form-control" placeholder="Category Number"
                                                   onChange={this.handlerChange}    aria-label="categoryNumber" id="categoryNumber" name = "categoryNumber" value = {this.state.categoryNumber}/>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="exampleFormControlTextarea1">Description</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                                  onChange={this.handlerChange}   rows="3" name = "description" value={this.state.description} ></textarea>
                                    </div>

                                    <div className="row">
                                        <div className="col form-group col-md-2">
                                            <label htmlFor="categoryName">Min</label>
                                            <input type="number" className="form-control" placeholder="min"
                                                   onChange={this.handlerChange}  aria-label="min" name = "min" id="min" value={this.state.min}/>
                                        </div>
                                        <div className="col form-group col-md-2" >
                                            <label htmlFor="categoryNumber">Max</label>
                                            <input type="number"max className="form-control" placeholder="max"
                                                   onChange={this.handlerChange}    aria-label="max" id="max" name = "max" value={this.state.max}/>
                                        </div>


                                    </div>
                                    <label htmlFor="categoryName">Severity</label>
                                    <select  onChange={this.handlerChange} className="form-select" aria-label="Default select example" value = {this.state.severity} name = "severity">
                                        <option selected>Open this select menu</option>
                                        <option value="high">High</option>
                                        <option value="low ">Medium</option>
                                        <option value="medium">Low</option>
                                    </select>


                                    <div className="col text-center">

                                        <button type="submit" className="btn btn-primary">Add Category</button>
                                    </div>

                                </form>


                            </div>
                        </Paper>
                    </Grid>
                </div>
            </div>*/



    constructor(props) {
        super(props);

        this.state={
            categoryName:'',
            categoryNumber:'',
            range:'',
            severity:'',
            description:'',
            min:'',
            max:''

        }


    }

    handlerSubmit = (e) =>{
        e.preventDefault();
        const range1 =  this.state.min + '-'+this.state.max
        console.log('range',range1);
        this.setState({range:range1})
        console.log(this.state);

    }

    handlerChange=(e)=>{

        this.setState({ [e.target.name]: e.target.value });

    }
    render() {
      return (
          <div>
              <form action="#" className="form-body-rules" onSubmit={this.onSubmit}>



                  <section className="p-5">
                      <div className="container">
                          <div className="row align-items-center justify-content-between">
                              <div className="col-md p-5">

                                  <div className="row">
                                      <div className="col">
                                          <label htmlFor="categoryName">Category Name</label>
                                          <input type="text" className="form-control" placeholder="Category Name"
                                                 onChange={this.handlerChange} aria-label="categoryName" name = "categoryName" id="categoryName" value={this.state.categoryName}/>
                                      </div>
                                      <div className="col">
                                          <label htmlFor="categoryNumber">Category Number</label>
                                          <input type="text" className="form-control" placeholder="Category Number"
                                                 onChange={this.handlerChange}    aria-label="categoryNumber" id="categoryNumber" name = "categoryNumber" value = {this.state.categoryNumber}/>
                                      </div>
                                  </div>
                              </div>

                              <div className="col-md p-5">

                                  <p className="lead">

                                  </p>
                              </div>

                          </div>

                          <row className="align-items-center justify ">

                              <p className="lead text-center ">

                              </p>

                          </row>


                      </div>
                      <hr/>
                      <center> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5 pt-5" role="group" aria-label="...">
                          <button className="btn btn-outline-secondary text-light px-5 mx-5" type="button"
                                  id="button-addon2" onClick={ this.handlerModelStart}>View Requests
                          </button>
                      </div>
                      </center>
                  </section>
              </form>
              <footer/>

          </div>
        )
    }







}