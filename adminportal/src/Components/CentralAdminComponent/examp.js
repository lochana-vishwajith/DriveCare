import React from 'react'
import Footer from "../Footer/Footer";
import Navbar from "../navbarComponent/navbar";
import './examp.css'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css"



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