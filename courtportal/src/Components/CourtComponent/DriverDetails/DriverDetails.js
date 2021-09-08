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
    this.navigateToComment = this.navigateToComment.bind(this);
    this.navigateToOfficer = this.navigateToOfficer.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/fine/`)
      .then((res) => {
        console.log("fines -", res.data);

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

  navigateToComment(e) {
    console.log(e);
    window.location = `/courtDriverComments/${e}`;
    //window.location = `/courtEditComment/${e}`;
  }

  navigateToOfficer(e) {
    window.location = `/courtOfficerDetails/${e}`;
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

        {this.state.fines.map((fine) => (
          <div>
            <div>
              <div className="card cardd">
                <div className="card-body">
                  <h3 className="card-title">Payed : {fine.isPayed}</h3>
                  <h3 className=" card-text">Police Officers</h3>
                  {fine.Officers.map((val, k) => (
                    <a
                      key={k}
                      onClick={(e) => {
                        this.navigateToOfficer(val._id);
                      }}
                      href="#"
                      className="card-link"
                    >
                      {val.nameInitial}
                    </a>
                  ))}

                  {/* <a href="#" className="card-link">
                Officer 02
              </a> */}
                  <br />
                  <br />
                  <h3 className=" card-text">Drivers Comment</h3>
                  {fine.comments.map((val, k) => (
                    <p key={k} className="card-text">
                      {val.comment}
                    </p>
                  ))}

                  <br />
                  <button className="btn btn-danger">Evidance</button>
                  <br />
                  <br />
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Rule Name</th>
                        <th>Description</th>
                        <th>Fine</th>
                      </tr>
                    </thead>
                    {fine.violationType.map((val, k) => (
                      <tbody key={k}>
                        <tr>
                          <td>{val.ruleName}</td>
                          <td>{val.description}</td>
                          <td>{val.fineAmount}</td>
                        </tr>
                      </tbody>
                    ))}
                  </table>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        ))}

        <br />

        <button
          type="button"
          style={{ float: "right", backgroundColor: "#920e0e" }}
          className="btn btn-danger"
          onClick={(e) => {
            this.navigateToComment(this.props.match.params.id);
          }}
        >
          Comments
        </button>

        <br />
      </div>
    );
  }
}

export default DriverDetails;
