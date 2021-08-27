import React from "react";
import "./DriverDetails.css";

class DriverDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Hasitha Rangana",
      nic: "987654567V",
    };
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
        <div className="iname">
          <div className="form-group ">
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
          <div className="form-group ">
            <label>NIC :</label>
            <input
              value={this.state.nic}
              disabled
              type="text"
              class="form-control"
              id="name"
              height="250px"
            />
          </div>
        </div>
        <br />
        <table className="table tablee ">
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
              <td scope="row">Drink and drive</td>
              <td>2021-08-03</td>
              <td>2500</td>
              <td>@images</td>
            </tr>
            <tr>
              <td scope="row">Hit and run</td>
              <td>2021-08-03</td>
              <td>2500</td>
              <td>@images</td>
            </tr>
            <tr>
              <td scope="row">High speed</td>
              <td>2021-08-03</td>
              <td>2500</td>
              <td>@images</td>
            </tr>
          </tbody>
        </table>
        <br />
        <a href="/courtDriverComments">
          <button
            type="button"
            style={{ float: "right", backgroundColor: "#920e0e" }}
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
