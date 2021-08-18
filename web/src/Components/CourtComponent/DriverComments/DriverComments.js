import React from "react";
import "./DriverComments.css";

class DriverComments extends React.Component {
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
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
            </tr>
          </tbody>
        </table>

        <button type="button" class="btn btn-success">
          Generate Report
        </button>

        <button
          type="button"
          class="btn btn-primary"
          style={{ float: "right" }}
        >
          Add Comment
        </button>
      </div>
    );
  }
}

export default DriverComments;
