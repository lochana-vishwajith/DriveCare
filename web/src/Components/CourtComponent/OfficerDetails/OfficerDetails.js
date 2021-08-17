import React from "react";
import "./OfficerDetails.css";

class OfficerDetails extends React.Component {
  render() {
    return (
      <div>
        <h1>Officer Details</h1>

        <div className="form-group">
          <label>Name :</label>
          <input type="text" class="form-control" id="name" height="250px" />
        </div>
        <br />
        <br />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Comment</th>
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
        <br />
        <button type="button" className="btn btn-primary">
          Add Comment
        </button>
        <br />
      </div>
    );
  }
}

export default OfficerDetails;
