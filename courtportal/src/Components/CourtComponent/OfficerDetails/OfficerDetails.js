import React from "react";
import "./OfficerDetails.css";
import axios from "axios";

class OfficerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      officerID: "",
      comments: [],
    };
    this.deleteComment = this.deleteComment.bind(this);
    this.navigateAddComment = this.navigateAddComment.bind(this);
  }

  async componentDidMount() {
    await axios
      .get(`http://localhost:9000/trafficOfficer/`)
      .then((res) => {
        console.log("Officer data -", res.data);

        res.data.forEach((officer) => {
          if (officer._id == this.props.match.params.id) {
            this.setState({ name: officer.nameInitial });
            this.setState({ officerID: officer.officerReg });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    await axios
      .get(`http://localhost:9000/courtp/getc/`)
      .then((response) => {
        console.log(response.data);
        const officerComments = [];

        response.data.forEach((comment) => {
          if (comment.officerID == this.props.match.params.id) {
            officerComments.push(comment);
          }
        });
        console.log(officerComments);
        this.setState({ comments: officerComments });
        //this.setState({ comments: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  deleteComment(e) {
    console.log(e);
    axios
      .delete(`http://localhost:9000/courtp/deletecp/${e}`)
      .then((response) => {
        alert("Comment deleted sucessfully");
        window.location = `/courtOfficerDetails/${this.props.match.params.id}`;
      })
      .catch((error) => {
        console.log(`Error - ${error.message}`);
      });
  }

  navigateAddComment(e) {
    window.location = `/courtAddCommentpolice/${e}`;
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
                <td>
                  <i
                    style={{ color: "red" }}
                    className="fas fa-trash fa-2x"
                    onClick={(e) => {
                      this.deleteComment(comment._id);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        <br />

        <button
          style={{ float: "right", backgroundColor: "#920e0e" }}
          type="button"
          className="btn btn-danger"
          onClick={(e) => {
            this.navigateAddComment(this.props.match.params.id);
          }}
        >
          Add Comment
        </button>

        <br />
      </div>
    );
  }
}

export default OfficerDetails;
