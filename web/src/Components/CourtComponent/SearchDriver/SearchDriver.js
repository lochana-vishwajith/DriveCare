import React from "react";
import "./SearchDriver.css";
import CourtHeader from "../CourtHeader/CourtHeader";

class SearchDriver extends React.Component {
  render() {
    return (
      <div className="container">
        <CourtHeader />
        <h1>Search the driver</h1>
        <br />
        <br />
        <h3>Enter the drivers licences number</h3>
        <br />
        <div className="input-group rounded">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Enter the driver licences number"
            aria-label="Search"
            aria-describedby="search-addon"
          />
        </div>
        <br />
        <button className="btn btn-primary btnSearch">Search</button>
      </div>
    );
  }
}

export default SearchDriver;
