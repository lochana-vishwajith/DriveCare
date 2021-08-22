import React from "react";
import CourtHeader from "../CourtHeader/CourtHeader";
import "./JudgeRegister.css";
import axios from "axios";

class JudgeRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dob: "",
      court: "",
      username: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const judge = {
      name: this.state.name,
      dob: this.state.dob,
      court: this.state.court,
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("http://localhost:9000/judge/post", judge)
      .then((res) => {
        alert("Iserted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container">
        <CourtHeader />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <h1>
          <strong>Judge Registration</strong>
        </h1>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              required="true"
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter the name"
              height="250px"
              onChange={this.onChange}
            />

            <br />
            <label for="exampleInputEmail1">Date of Birth</label>
            <input
              required="true"
              type="date"
              className="form-control"
              name="dob"
              placeholder="Enter the DOB"
              height="250px"
              onChange={this.onChange}
            />
            <br />

            <label for="exampleInputEmail1">Enter the court</label>
            <input
              required="true"
              type="text"
              className="form-control"
              name="court"
              placeholder="Enter the court"
              height="250px"
              onChange={this.onChange}
            />
            <br />
            <label for="exampleInputEmail1">UserName</label>
            <input
              required="true"
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter a username"
              height="250px"
              onChange={this.onChange}
            />
            <br />
            <label for="exampleInputEmail1">Enter a password</label>
            <input
              required="true"
              type="text"
              className="form-control"
              name="password"
              placeholder="Enter a password"
              height="250px"
              onChange={this.onChange}
            />
            <br />

            <button
              type="submit"
              className="btn btn-danger"
              style={{ float: "right", backgroundColor: "#920e0e" }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default JudgeRegister;
