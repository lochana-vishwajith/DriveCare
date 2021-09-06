import React from "react";
import "./DriverDetails.css";
import axios from "axios";

class DriverDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nic: "",
      fines: [],
      driver: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/fine/`)
      .then((response) => {
        console.log(response.data);
        response.data
          .filter((fine) => {
            if (fine.driverID === this.props.match.params.id) {
              return true;
            }
          })
          .map((fine, index) => {
            this.setState({ fines: fine });
          });
        //this.setState({ fines: response.data });
      })
      .catch((e) => {
        console.log(`the error is ${e}`);
      });

    axios
      .get(`http://localhost:9000/driver/${this.props.match.params.id}`)
      .then((res) => {
        this.setState({ driver: res.data });
        this.state.driver.map((driver, index) => {
          this.setState({ name: driver.displayName });
          this.setState({ nic: driver.NIC });
        });
      })
      .catch((err) => {
        console.log(err);
      });
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

        {/* {this.state.fines
          .filter((fine) => {
            if (fine.driverID === "6122a4516a5b6328e8b9533c") {
              return true;
            }
          })
          .map((person) => (
            <div>
              <h2>{person.courtDate}</h2>
              <h2>{person.place}</h2>
              <h2>{person.isPayed}</h2>
            </div>
          ))} */}

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

        <div>
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
