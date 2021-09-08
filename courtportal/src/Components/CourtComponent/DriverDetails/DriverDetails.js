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
      .then((res) => {
        console.log("fines -", res.data);
        // this.setState({ fines: res.data });
        // res.data
        //   .filter((fine) => {
        //     if (fine.driverID === this.props.match.params.id) {
        //       return true;
        //     }
        //   })
        //   .map((fine) => {
        //     this.setState({ fines: fine });
        //   });
        //console.log("ushara", this.state.fines);
        ////////////////////////////////////////////////////////////////
        // const f = res.data.filter((fine) => {
        //   return fine.driverID === this.props.match.params.id;
        // });

        // console.log(f);

        // f.map((fine) => {
        //   this.setState({ fines: fine });
        // });
        //////////////////////////////////////////////////////

        const dFines = [];

        res.data.forEach((fine) => {
          if (fine.driverID == this.props.match.params.id) {
            //fine.push(dFines);
            dFines.push(fine);
          }
        });

        console.log(dFines);

        this.setState({ fines: dFines });
        console.log(this.state.fines);
      })
      .catch((error) => {
        console.log(error);
      });

    //getting driver details
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
              <th scope="col">Rule Name</th>
              <th scope="col">Description</th>

              <th scope="col">Fine</th>
              <th scope="col">Evidence</th>
              <th scope="col">Comments</th>
              <th scope="col">Officers</th>
            </tr>
          </thead>
          <tbody>
            {this.state.fines.map((fine, index) => (
              <tr key={index}>
                <td>{fine.violationType.map((val, k) => val.ruleName)}</td>

                <td>{fine.violationType.map((val, k) => val.description)}</td>
                <td>{fine.violationType.map((val, k) => val.fineAmount)}</td>
                <td>
                  <p>Evidance</p>
                </td>
                <td>{fine.comments.map((val, k) => val.comment)}</td>
                <td>{fine.Officers.map((val, k) => val.nameInitial)}</td>
              </tr>
            ))}
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
