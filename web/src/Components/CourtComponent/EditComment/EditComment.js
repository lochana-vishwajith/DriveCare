import React from "react";
import "./EditComment.css";
import axios from "axios";
import CourtHeader from "../CourtHeader/CourtHeader";

const initialState = {
  date: "",
  comment: "",
};

class EditComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/court/getc/${this.props.match.params.id}`)
      .then((response) => {
        //console.log(response.data);
        this.setState({ date: response.data.date });
        this.setState({ comment: response.data.comment });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newComment = {
      comment: this.state.comment,
    };

    axios
      .put(
        `http://localhost:9000/court/putc/${this.props.match.params.id}`,
        newComment
      )
      .then((response) => {
        console.log("awaaaaaaaaaa");
        console.log(e);
        alert("Comment updated sucessfully");
        window.location = "/courtDriverComments";
      })
      .catch((error) => {
        console.log(error.message);
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
        <h1>Edit Comment</h1>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="exampleInputEmail1">Enter Date</label>
            <input
              disabled
              type="text"
              class="form-control"
              name="date"
              placeholder="Enter the date"
              height="250px"
              onChange={this.onChange}
              value={this.state.date}
            />
          </div>
          <br />
          <br />
          <div className="form-group">
            <label for="exampleInputEmail1">Enter the Description</label>
            <textarea
              type="text"
              class="form-control"
              name="comment"
              aria-describedby="emailHelp"
              placeholder="Enter the description"
              onChange={this.onChange}
              value={this.state.comment}
            />
          </div>
          <br />
          <button
            type="submit"
            style={{ float: "right" }}
            class="btn btn-danger"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditComment;
