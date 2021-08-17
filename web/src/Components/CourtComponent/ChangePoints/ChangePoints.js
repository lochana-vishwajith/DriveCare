import React from "react";

class ChangePoints extends React.Component {
  render() {
    return (
      <div>
        <h1>Change Points</h1>

        <div className="form-group">
          <label>Points</label>
          <input
            type="number"
            class="form-control"
            id="points"
            height="250px"
          />
        </div>
        <br />
        <button type="button" className="btn btn-primary">
          Save
        </button>
        <br />
      </div>
    );
  }
}

export default ChangePoints;
