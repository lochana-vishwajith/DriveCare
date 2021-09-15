import React from "react";
import "./AddCommentPolice.css";
import axios from "axios";
import Header from "../Header/Header";

const initialState = {
  officerID: "",
  judgeID: "612273ca2b539024f4063aee",
  date: "",
  comment: "",
};

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ officerID: this.props.match.params.id });
  }

  onSubmit(e) {
    e.preventDefault();
    const comment = {
      officerID: this.state.officerID,
      judgeID: this.state.judgeID,
      date: this.state.date,
      comment: this.state.comment,
    };
    console.log("data entered");

    axios
      .post(`http://localhost:9000/courtp/postc`, comment)
      .then((respose) => {
        alert("Comment entered");
        window.location = `/courtOfficerDetails/${this.props.match.params.id}`;
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <h1>
            <strong>Add Comment</strong>
          </h1>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label for="exampleInputEmail1">Enter Date</label>
              <input
                required="true"
                type="date"
                className="form-control"
                name="date"
                placeholder="Enter the date"
                height="250px"
                onChange={this.onChange}
              />
            </div>
            <br />
            <br />
            <div className="form-group">
              <label for="exampleInputEmail1">Enter the Description</label>
              <textarea
                required="true"
                type="text"
                className="form-control"
                name="comment"
                aria-describedby="emailHelp"
                placeholder="Enter the description"
                onChange={this.onChange}
              />
            </div>
            <br />
            <button
              type="submit"
              style={{ float: "right", backgroundColor: "#920e0e" }}
              className="btn btn-danger"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default AddComment;
