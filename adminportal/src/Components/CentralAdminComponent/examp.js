import React from 'react'
import Footer from "../Footer/Footer";
import Navbar from "../navbarComponent/navbar";
import './examp.css'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css"

import CardView from "../Cardview/Cardview";

/*
* <div>
            <div className="div">
            <Navbar portal = "ADD RULES" topic1 = "AdRules" topic2 = "AdminPannel" topic3 = "logout"/>
            </div>

            <form action="#" className="form-body-rules" onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col">
                        <div className="form-group form-part" >
                            <label htmlFor="RegistrationNumber">Registration Number</label>
                            <input type="text" name=""  className="form-control form-input-border"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group form-part" >
                            <label htmlFor="Mobile">Mobile</label>
                            <input type="text" name = ""  value = {this.state} className="form-control form-input-border"/>
                        </div>
                    </div>
                </div>


                <div className="form-group pt-1 form-part" >
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control form-input-border"name ="3 form-input-border"/>
                </div>


                <div className="form-group form-part">
                    <label htmlFor="email">email</label>
                    <input type="text" className="form-control form-input-border"name ="3"   />
                </div>


                <div className="form-group form-part">
                    <label htmlFor="password">Password</label>
                    <input type="text" className="form-control form-input-border"name ="3"/>
                </div>

                <div className="form-group form-part">
                    <label htmlFor="email">TextArea</label>
                    <textarea name="" id="" cols="30" rows="10" className="form-control border-b form-input-border"></textarea>
                </div>


                <div className="form-group form-part">
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" className="form-control form-input-border"name ="3">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    </select>
                </div>


                <div className="form-check form-part">
                    <input type="checkbox" id = "accept-terms" className="form-check-input form-input-border"name ="3 "/>
                    <label htmlFor="accept-terms" className="form-check-label">Accept terms & Conditions</label>
                </div>

                <div className="buttonHolder text-light">
                        <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"
                                id="btn_i text-light"><b> Submit </b></button>
                </div>
            </form>


            <Footer/>

    </div>

*
*
* */

/*
*   <div>
                <div className="div">
                    <Navbar portal = "ADD RULES" topic1 = "AdRules" topic2 = "AdminPannel" topic3 = "logout"/>
                </div>

                <section className="p-2 px-5">

                    <div className="container">

                    </div>
                    <div className="card-body ">

                    </div>
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="card-title">Special title treatment</h5>
                        </div>
                        <div className="row ">
                            <p className="card-text">With supporting text below as a natural lead-in to additional
                                content.</p>
                            <div className="buttonHolder text-light">
                                <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"
                                        id="btn_i text-light"><b> view Rules</b></button>
                            </div>

                        </div>
                    </div>



                </section>


                <section className="p-2 px-5">

                    <div className="container">

                    </div>
                    <div className="card-body ">

                    </div>
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="card-title">{this.props.title}</h5>
                        </div>
                        <div className="row ">
                            <p className="card-text">
                                <b> range - {this.props.range}</b>
                                <br></br>
                                {this.props.description}
                            </p>
                            <div className="buttonHolder text-light">
                                <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"
                                        id="btn_i text-light"><b> view Rules</b></button>
                            </div>

                        </div>
                    </div>



                </section>


                <section className="p-2 px-5">

                    <div className="container">

                    </div>
                    <div className="card-body ">

                    </div>
                    <div className="card text-center">
                        <div className="card-header">
                            <h5 className="card-title">Special title treatment</h5>
                        </div>
                        <div className="row ">
                            <p className="card-text">With supporting text below as a natural lead-in to additional
                                content.</p>
                            <div className="buttonHolder text-light">
                                <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"
                                        id="btn_i text-light"><b> view Rules</b></button>
                            </div>

                        </div>
                    </div>



                </section>





                <Footer/>


            </div>
*
* */

export default class example extends React.Component{

    constructor(props) {
    super(props);
    this.state ={
        show:false
    }
}

onSubmit = (e)=>{
    e.preventDefault();
    alert('hii');
}
handlerModelCancel =() =>{
        this.setState({show:false});
}

handlerModelStart = () => {
        this.setState({show:true});
}

    render() {

  const{show} =this.state;
        return (
            <div>

                <Modal show={show} className="modal-dialog modal-dialog-centered" >
                    <Modal.Header><b> SEARCH FOR THE POLICE STATION</b></Modal.Header>
                    <Modal.Body>
                        <form action="#" className="form-body-rules">
                        <div className="row">
                            <div className="col">
                                <div className="form-group form-part" >
                                    <label htmlFor="RegistrationNumber">Registration Number</label>
                                    <input type="text" name=""  className="form-control form-input-border"/>
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group form-part" >
                                    <label htmlFor="Mobile">Mobile</label>
                                    <input type="text" name = ""   className="form-control form-input-border"/>
                                </div>
                            </div>
                        </div>
<div className="row">

    <div className="col">
        <div className="buttonHolder text-ligh pt-5">
            <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"
                    id="btn_i text-light" onClick={this.handlerModelCancel}><b> cancel</b></button>
        </div>
    </div>
    <div className="col">

        <div className="buttonHolder text-ligh pt-5">
            <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"
                    id="btn_i text-light"><b> Submit </b></button>
        </div>
    </div>
</div>

                        </form>

                    </Modal.Body>
                    <Modal.Footer className="text-center">Click Cancel to Exit from Search menu</Modal.Footer>
                </Modal>

                <button type="button" className="btn btn-primary" onClick={this.handlerModelStart}>
                    Launch static backdrop modaldsadsad
                </button>



                <Footer/>
            </div>


        )}


}