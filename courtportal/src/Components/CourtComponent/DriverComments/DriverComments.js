import React from "react";
import "./DriverComments.css";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import exportPDF from "jspdf";
import Header from "../Header/Header";

class DriverComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
    };
    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.navigateToAddComment = this.navigateToAddComment.bind(this);
    this.genaratePFD = this.genaratePFD.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/court/getc/`)
      .then((response) => {
        //this.setState({ comments: response.data });
        console.log(response.data);

        const dComments = [];

        response.data.forEach((comment) => {
          if (comment.driverID == this.props.match.params.id) {
            dComments.push(comment);
          }
        });

        this.setState({ comments: dComments });
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
        window.location = `/courtDriverComments/${this.props.match.params.id}`;
      })
      .catch((error) => {
        console.log(`Error - ${error.message}`);
      });
  }

  updateComment(e) {
    console.log(e);
    window.location = `/courtEditComment/${e}`;
  }

  navigateToAddComment(e) {
    window.location = `/courtAddComment/${e}`;
  }

  genaratePFD(e) {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    const title = "Driver Comment Details";
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
    doc.save("Driver_Comments.pdf");
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
            {" "}
            <strong>Driver Comments</strong>
          </h1>

          <table id="target" className="table">
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
            type="button"
            class="btn btn-danger btnz"
            style={{ float: "right", backgroundColor: "#920e0e" }}
            onClick={(e) => {
              this.navigateToAddComment(this.props.match.params.id);
            }}
          >
            Add Comment
          </button>
        </div>
      </div>
    );
  }
}

export default DriverComments;
