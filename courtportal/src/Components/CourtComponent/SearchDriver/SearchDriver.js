import React from "react";
import "./SearchDriver.css";
import axios from "axios";
import Header from "../Header/Header";

class SearchDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drivers: [],
      searchTerm: "",
    };
    this.onChange = this.onChange.bind(this);
    this.navigateToDriverProfile = this.navigateToDriverProfile.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/driver/")
      .then((res) => {
        console.log(res.data);
        this.setState({ drivers: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  navigateToDriverProfile(e) {
    console.log(e);
    window.location = `/courtDriverDetails/${e}`;
  }

  render() {
    const { searchTerm } = this.state;

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
            <strong>Search the driver</strong>
          </h1>

          <br />
          <br />
          <h3>Enter the drivers licences number</h3>
          <br />
          <div className="input-group rounded">
            <input
              onChange={this.onChange}
              type="search"
              className="form-control rounded"
              placeholder="Enter the driver licences number"
              aria-label="Search"
              aria-describedby="search-addon"
            />
          </div>
          <br />
          {/* <button
          style={{ backgroundColor: "#920e0e" }}
          className="btn btn-danger btnSearch"
        >
          Search
        </button> */}
          <br />
          <br />
          <br />

          <table className="table">
            <thead>
              <tr>
                <th>Licence Number</th>
                <th>Name</th>
                <th>NIC</th>
              </tr>
            </thead>

            {this.state.drivers
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.licenceNumber
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((val, key) => (
                <tbody key={key}>
                  <tr>
                    <td>
                      <div
                        onClick={(e) => {
                          this.navigateToDriverProfile(val._id);
                        }}
                      >
                        {val.licenceNumber}
                      </div>
                      {/* {val.licenceNumber} */}
                    </td>
                    <td>{val.firstName}</td>
                    <td>{val.NIC}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    );
  }
}

export default SearchDriver;
