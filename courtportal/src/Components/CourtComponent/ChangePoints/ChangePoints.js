import React from "react";

import "./ChangePoints.css";
import axios from "axios";
import Header from "../Header/Header";

//OFFICER CHANGE POINTS
class ChangePoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/trafficOfficer/`)
      .then((res) => {
        console.log("Officer data -", res.data);

        res.data.forEach((officer) => {
          if (officer._id == this.props.match.params.id) {
            this.setState({ points: officer.points });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChange(e) {
    if (e.target.value <= 30 && e.target.value >= 0) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      alert("Point range is 0 - 30");
    }
    //this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    //e.preventDefault();
    const newPoint = {
      points: this.state.points,
    };
    console.log("driverID -", e);

    axios
      .put(`http://localhost:9000/trafficOfficer/updateopoints/${e}`, newPoint)
      .then((res) => {
        console.log("Response -", res);
        alert("Points updated Successfully !");
        window.location = `/courtOfficerDetails/${this.props.match.params.id}`;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
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

          <h1 className="headerr">
            {" "}
            <strong>Change Points </strong>
          </h1>

          <div className="form-group">
            <label>Points</label>
            <input
              required="true"
              name="points"
              type="number"
              class="form-control"
              height="250px"
              onChange={this.onChange}
              value={this.state.points}
            />
          </div>
          <br />
          <button
            type="button"
            style={{ float: "right" }}
            className="btn btn-danger btnSave"
            onClick={(e) => this.onSubmit(this.props.match.params.id)}
          >
            Save
          </button>
          <br />
        </div>
      </div>
    );
  }
}

export default ChangePoints;
