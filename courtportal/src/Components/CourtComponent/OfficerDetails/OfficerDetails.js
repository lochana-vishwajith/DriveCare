import React from "react";
import "./OfficerDetails.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import exportPDF from "jspdf";

class OfficerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      officerID: "",
      points: "",
      comments: [],
    };
    this.deleteComment = this.deleteComment.bind(this);
    this.navigateAddComment = this.navigateAddComment.bind(this);
    this.navigateChangrPoints = this.navigateChangrPoints.bind(this);
    this.genaratePFD = this.genaratePFD.bind(this);
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
            this.setState({ points: officer.points });
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

  navigateChangrPoints(e) {
    window.location = `/courtChangePoints/${e}`;
  }

  genaratePFD(e) {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Officer Comment Details";
    const headers = [["Date", "Comment"]];

    const c = this.state.comments.map((comment) => [
      comment.date,
      comment.comment,
    ]);

    let contents = {
      starty: 50,
      head: headers,
      body: c,
    };

    doc.setFontSize(20);
    doc.text(title, marginLeft, 40);
    require("jspdf-autotable");
    doc.autoTable(contents);
    doc.save("Officer_Comments.pdf");
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
              {this.state.points}
            </h5>

            <button
              type="button"
              onClick={(e) => {
                this.navigateChangrPoints(this.props.match.params.id);
              }}
              className="btn btn-success"
            >
              Change Points
            </button>
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
          onClick={(e) => {
            this.genaratePFD();
          }}
          type="button"
          class="btn btn-success btnz"
        >
          Generate Report
        </button>

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
