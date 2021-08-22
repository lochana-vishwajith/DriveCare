import React from "react";
import "./DriverDetails.css";
import CourtHeader from "../CourtHeader/CourtHeader";

class DriverDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Hasitha Rangana",
    };
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
          <strong>Driver Details</strong>
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
          <thead>
            <tr>
              <th scope="col">Violation</th>
              <th scope="col">Date</th>
              <th scope="col">Fine</th>
              <th scope="col">Evidence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td scope="row">2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td scope="row">3</td>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        <br />
        <a href="/courtDriverComments">
          <button
            type="button"
            style={{ float: "right" }}
            className="btn btn-danger"
          >
            Comments
          </button>
        </a>
        <br />
      </div>
    );
  }
}

export default DriverDetails;
