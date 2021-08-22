import React from "react";
import "./OfficerDetails.css";
import axios from "axios";
import CourtHeader from "../CourtHeader/CourtHeader";

class OfficerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Kamal Gunarathana",
      comments: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/courtp/getc/`)
      .then((response) => {
        this.setState({ comments: response.data });
        console.log(response.data);
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
        <h1>Officer Details</h1>

        <div className="card pointcard">
          <div className="card-header">Points</div>
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: "60px" }}>
              07
            </h5>
            <a href="/courtChangePoints">
              <button type="button" className="btn btn-primary">
                Change Points
              </button>
            </a>
          </div>
        </div>

        <div className="form-group">
          <label>Name :</label>
          <input
            value={this.state.name}
            disabled
            type="text"
            class="form-control"
            id="name"
            height="250px"
          />
        </div>
        <br />
        <br />
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">DATE</th>
              <th scope="col">COMMENT</th>
            </tr>
          </thead>

          {this.state.comments.map((comment, index) => (
            <tbody key={index}>
              <tr>
                <td scope="row">{comment.date}</td>
                <td>{comment.comment}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <br />
        <a href="/courtAddCommentpolice">
          <button
            style={{ float: "right" }}
            type="button"
            className="btn btn-primary"
          >
            Add Comment
          </button>
        </a>
        <br />
      </div>
    );
  }
}

export default OfficerDetails;
