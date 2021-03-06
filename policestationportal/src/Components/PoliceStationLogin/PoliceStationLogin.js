import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";
import "./PolicestationLogin.css";
import Navbar from "../navbarComponent/navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import AuthContext from "../../Reducer/UseReducer";
import {Card} from "react-bootstrap";

export default class PoliceStationLogin extends Component {
  componentDidMount() {
    localStorage.clear();
  }

  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      registrationNo: "",
      password: "",
    };
  }

  handlerChanged = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlerSubmit = (e) => {

    e.preventDefault();

    const { registrationNo, password } = this.state;
    const { logIn, setStationId } = this.context;
    //res.data
    const station = {
      registrationNo,
      password,
    };




    axios
      .post(`http://localhost:9000/policeStation/login`, station)
      .then((response) => {
        if (response.data.id) {
          alert("login Sucess");
          localStorage.setItem("userid", response.data.id);
          logIn();
          setStationId(response.data.id);
          this.props.history.push("/dashboard");
        } else {
          alert("login failed");
        }
        // window.location = "/policestationList"
      })
      .catch((error) => {
        alert("error");
        console.log(error.message);
      });

    console.log("state", this.state);
  };

  handlerError = () => {
    this.setState({ registrationNo: "CPKY12224" });
    this.setState({ password: "HELLO" });
  };
  handlerSuccess = () => {
    this.setState({ registrationNo: "KKG1234" });
    this.setState({ password: "hasitha" });
  };

  render() {
    return (
      <div>
        <Navbar
          portal="-POLICE STATION LOGIN-"
          topic1="POLICE STATION LOGIN"
          topic2="VIEW ADMIN DETAILS"
          link1="/policelogin"
          link2="/viewAdmin"
        />






        <center><div style={{ paddingTop: '3rem' }}><Card
            border="danger" style={{ width: '35rem',boxShadow: "0.8px 0.8px 15px 1px" }}
        >
          <Card.Body>
            <div className="container">
              <form
                  className="form-body-rules "
                  onSubmit={this.handlerSubmit}
              ></form>
              <div className="row">
                <div className="form-group  form-part">
                  <label htmlFor="username">OFFICE ID</label>
                  <input
                      type="text"
                      className="form-control form-input-border"
                      name="registrationNo"
                      onChange={this.handlerChanged}
                      value={this.state.registrationNo}
                      required={true}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group pt-1 form-part">
                  <label htmlFor="username">PASSWORD</label>
                  <input
                      type="password"
                      className="form-control form-input-border"
                      name="password"
                      value={this.state.password}
                      onChange={this.handlerChanged}
                  />
                </div>
              </div>

              <br></br>
              <br></br>

              <center>
                <button
                    className="btn btn-outline-danger"
                    type="button"
                    id="button-addon2"
                    onClick={this.handlerSubmit}
                >
                  LOGIN
                </button>
              </center>
            </div>

          </Card.Body>
        </Card></div>
        </center>













        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="btn-group-vertical">
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handlerError}
          >
            DEMO ERROR
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handlerSuccess}
          >
            DEMO SUCCESS
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}
