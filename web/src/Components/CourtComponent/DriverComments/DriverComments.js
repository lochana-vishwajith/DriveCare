import React from "react";
import "./DriverComments.css";
import axios from "axios";

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
      <div>
        <h1>Driver Comments</h1>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Description</th>
            </tr>
          </thead>

          {this.state.comments.map((comment, index) => (
            <tbody key={index}>
              <tr>
                <th scope="row">{comment.date}</th>
                <td>{comment.comment}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => {
                      this.deleteComment(comment._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      this.updateComment(comment._id);
                    }}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>

        <button type="button" class="btn btn-success">
          Generate Report
        </button>
        <a href="/courtAddComment">
          <button
            type="button"
            class="btn btn-primary"
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
