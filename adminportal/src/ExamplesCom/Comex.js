import React from 'react'
import "./Comex.css"
import Navbar from '../Components/CentralAdminComponent/navbarComponent/navbar'
import Footer from "../Components/Footer/Footer";

export default class Comex extends React.Component{
    constructor(props) {
        super(props);
    }


    render() {

        return(
            <div>
                <Navbar portal = "Police Stations"/>

                <section className=" text-light p-5 sec-color">

                    <div className="container">

                                    <div className="row ">
                                        <div className="col-8">
                                            <h3></h3>
                                        </div>
                                        <div className="col-4">
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control"
                                                       placeholder="Click on Button to search"
                                                       aria-label="Recipient's username"
                                                       aria-describedby="button-addon2" disabled/>
                                                    <button className="btn btn-outline-secondary text-light" type="button"
                                                            id="button-addon2">Button
                                                    </button>
                                            </div>
                                        </div>
                                    </div>

                    </div>

                </section>
<br></br>
                <Footer/>

            </div>
        )
    }


}