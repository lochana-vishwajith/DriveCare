import React from "react";
import "./SearchDriver.css";

class SearchDriver extends React.Component {
  render() {
    return (
      <div>
        <h1>Search the driver</h1>
        <br />
        <br />

        <br />
        <div className="input-group rounded">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Enter the driver licences number"
            aria-label="Search"
            aria-describedby="search-addon"
          />

          <button className="btn btn-primary">Search</button>
        </div>
      </div>
    );
  }
}

export default SearchDriver;
