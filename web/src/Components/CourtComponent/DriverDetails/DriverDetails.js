import React from "react";
import "./DriverDetails.css";

class DriverDetails extends React.Component {
  render() {
    return (
      <div>
        <h1>Driver Details</h1>

        <div className="form-group">
          <label>Name :</label>
          <input type="text" class="form-control" id="name" height="250px" />
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
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
        <br />
        <button type="button" className="btn btn-primary">
          Comments
        </button>
        <br />
      </div>
    );
  }
}

export default DriverDetails;
