import React from "react";
import "./DriverComments.css";
import axios from "axios";
import CourtHeader from "../CourtHeader/CourtHeader";

class DriverComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/court/getc/`)
      .then((response) => {
        this.setState({ comments: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  deleteComment(e) {
    console.log(e);
    axios
      .delete(`http://localhost:9000/court/deletec/${e}`)
      .then((response) => {
        alert("Comment deleted sucessfully");
        window.location = "/courtDriverComments";
      })
      .catch((error) => {
        console.log(`Error - ${error.message}`);
      });
  }

  updateComment(e) {
    console.log(e);
    window.location = `/courtEditComment/${e}`;
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
          {" "}
          <strong>Driver Comments</strong>
        </h1>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">DATE</th>
              <th scope="col">COMMENT</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          {this.state.comments.map((comment, index) => (
            <tbody key={index}>
              <tr>
                <td scope="row">{comment.date}</td>
                <td>{comment.comment}</td>
                <td>
                  {/* <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      this.deleteComment(comment._id);
                    }}
                  >
                    Delete
                  </button> */}
                  <i
                    style={{ color: "red" }}
                    className="fas fa-trash fa-2x"
                    onClick={(e) => {
                      this.deleteComment(comment._id);
                    }}
                  />
                </td>
                <td>
                  {/* <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      this.updateComment(comment._id);
                    }}
                  >
                    Update
                  </button> */}
                  <i
                    className="fas fa-edit fa-2x"
                    onClick={(e) => {
                      this.updateComment(comment._id);
                    }}
                  ></i>
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        <button type="button" class="btn btn-success btnz">
          Generate Report
        </button>
        <a href="/courtAddComment">
          <button
            type="button"
            class="btn btn-danger btnz"
            style={{ float: "right" }}
          >
            Add Comment
          </button>
        </a>
      </div>
    );
  }
}

export default DriverComments;
