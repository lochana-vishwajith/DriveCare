import React from "react";
import "./OfficerDetails.css";
import axios from "axios";

class OfficerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Kamal Gunarathana",
      officerID: "KLP12345",
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <h1>
          <strong>Officer Details</strong>
        </h1>

        <div className="card pointcard">
          <div className="card-header">
            {" "}
            <strong>Points</strong>
          </div>
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: "60px" }}>
              07
            </h5>
            <a href="/courtChangePoints">
              <button type="button" className="btn btn-success">
                Change Points
              </button>
            </a>
          </div>
        </div>
        <div className="iname">
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
          <div className="form-group">
            <label>Officer ID :</label>
            <input
              value={this.state.officerID}
              disabled
              type="text"
              class="form-control"
              id="name"
              height="250px"
            />
          </div>
        </div>
        <br />
        <table className="table tablee">
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
            style={{ float: "right", backgroundColor: "#920e0e" }}
            type="button"
            className="btn btn-danger"
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
