import React from 'react'
import {Grid, Paper} from "@material-ui/core";
import "./AddRulesCategories.css"
import Navbar from "../../../navbarComponent/navbar";
import axios from "axios";
import Footer from "../../../Footer/Footer";

export default class AddRuleCategories extends React.Component{




    constructor(props) {
        super(props);

        this.state={
            categoryName:'',
            categoryNumber:'',
            severity:'',
            description:'',
            min:'',
            max:''

        }


    }

    handlerSubmit = (e) =>{
        e.preventDefault();
        const range =  this.state.min + '-'+this.state.max



        const {
            categoryName,
            categoryNumber,
            severity,
            description,
        }=this.state

        const category = {
            categoryName,
            categoryNumber,
            severity,
            description,
            range
        }

        axios
            .post(`http://localhost:9000/rulesCategory/`, category)
            .then((response) => {
                alert("Category Added");
                window.location = "/rulescategorylist"
            })
            .catch((error) => {
                console.log(error.message);
            });

    }

    handlerChange=(e)=>{

        this.setState({ [e.target.name]: e.target.value });

    }
    handlerError =() =>{

        this.setState({categoryName:'Highway Violations' });
        this.setState({ severity:'HIGH'});
        this.setState({  min:'2'});
        this.setState({ max:'15'});



    }

    handlerSuccess = () =>{

        this.setState({categoryName:'Highway Violations' });
        this.setState({ severity:'HIGH'});
        this.setState({ description:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia'});
        this.setState({  min:'2'});
        this.setState({ max:'15'});
        this.setState({ categoryNumber:'HV-1233'});
    }


    render() {
      return (




          <div>
              <Navbar portal = "-ADD RULES CATEGORIES-" topic1 = "RULES & CATEGORIES"  topic2 = "DASHBOARD"  link1 = "/rulescategorylist" link2 ="/dashboard"  />
              <form action="#" className=" p-1" onSubmit={this.handlerSubmit}>

                  <section className="mt-0">
                      <div className="container">
                          <div className="row align-items-center justify-content-between" >
                              <div className="col-md p-2">
                                  <div className="form-group form-part">
                                      <label htmlFor="email"><h3>CATEGORY NAME</h3></label>
                                      <input type="text" className="form-control form-input-border"name ="categoryName" placeholder="ENTER CATEGORY NAME"  value={this.state.categoryName} required={true} onChange={this.handlerChange}/>
                                  </div>
                                  <div className="form-group form-part">
                                      <label htmlFor="email"><h3>CATEGORY NUMBER</h3></label>
                                      <input type="text" className="form-control form-input-border"name ="categoryNumber" placeholder="ENTER CATEGORY NUMBER" value={this.state.categoryNumber} required={true} onChange={this.handlerChange} />
                                  </div>
                                  <div className="col">
                                      <div className="form-group form-part">
                                          <label htmlFor="station_grade"><h3>SEVERITY</h3></label>
                                          <select name="severity" id="severity" className="form-control form-input-border"name ="severity" value={this.state.severity} placeholder="SELECT GRADE" onChange={this.handlerChange}  >
                                              <option selected>Open this select menu</option>
                                              <option value="HIGH">HIGH</option>
                                              <option value="LOW">LOW</option>
                                              <option value="MODERATE">MODERATE</option>
                                          </select>
                                      </div>
                                  </div>

                              </div>

                              <div className="col-md p-1">

                                  <p className="lead">
                                      <div className="form-group form-part">
                                          <br/>
                                          <label htmlFor="description"><h3>DESCRIPTION</h3></label>
                                          <textarea name="description" id="description" cols="30" rows="10" placeholder="ENTER DESCRIPTION" value={this.state.description} className="form-control border-b form-input-border" required={true} onChange={this.handlerChange}></textarea>
                                      </div>
                                  </p>
                              </div>

                          </div>

                          <row className="align-items-center justify ">

                              <p className="lead text-center ">
                                  <div className="row">
                                      <div className="col">
                                          <div className="form-group form-part" >
                                              <label htmlFor="RegistrationNumber"><h3>MIN POINT</h3></label>
                                              <input type="text" name="min" value={this.state.min}  placeholder="ENTER APPROX MIN" className="form-control form-input-border" onChange={this.handlerChange} />
                                          </div>
                                      </div>
                                      <div className="col">
                                          <div className="form-group form-part" >
                                              <label htmlFor="Mobile"><h3>MAX POINT</h3></label>
                                              <input type="text" name = "max"  value = {this.state.max} placeholder="ENTER APPROX MAX" className="form-control form-input-border" onChange={this.handlerChange}/>
                                          </div>
                                      </div>
                                  </div>
                              </p>

                          </row>


                      </div>
                      <hr/>
                      <center> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5 pt-5" role="group" aria-label="...">
                          <button className="btn btn-outline-secondary text-light px-5 mx-5" type="submit"
                                  id="button-addon2">ADD CATEGORY
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
        )
    }







}