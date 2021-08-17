import React from "react";
import "./EditComment.css";

class EditComment extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Edit Comment</h1>

        <form>
          <div className="form-group">
            <label for="exampleInputEmail1">Enter Date</label>
            <input
              disabled
              type="date"
              class="form-control"
              id="date"
              placeholder="Enter the date"
              height="250px"
            />
          </div>
          <br />
          <br />
          <div className="form-group">
            <label for="exampleInputEmail1">Enter the Description</label>
            <textarea
              type="text"
              class="form-control"
              id="text"
              aria-describedby="emailHelp"
              placeholder="Enter the description"
            />
          </div>
          <br />
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default EditComment;
