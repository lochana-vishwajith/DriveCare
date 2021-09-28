import React from 'react'
import "./navbar.css"

export default class navbar extends React.Component{

    render() {
        return(<div>

            <nav className="navbar navbar-expand-lg navbar-dark " id = "navbarNav">
                <div className="container">

                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc"
                        className="w-100 shadow-1-strong rounded mb-4"
                        id="driveLoginLogoH"
                        alt="img"
                    />
                    <button className="navbar-toggler" type="button" data-bs-toggle = "collapse" data-bs-target = "#navMenu" >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id ="navMenu" >

                        <ul className="navbar-nav ms-auto nav-pills "  >
                            <li className="nav-item">
                                <a href={this.props.link1} className="nav-link active text-light"><b>{this.props.topic1}</b></a>
                            </li>
                            <li className="nav-item">
                                <a href={this.props.link2} className="nav-link text-light"><b>{this.props.topic2}</b></a>
                            </li>
                            <li className="nav-item">
                                <a href={this.props.link3}  className="nav-link text-light"><b>{this.props.topic3}</b></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="bg-light text-dark p-3 text-center thicker">
                <div className="container">
                    <div>
                        <h1><b>{this.props.portal}</b></h1>
                    </div>
                </div>
            </section>

        </div>)

    }
}