import React from "react";

import "./ChangePointsDriver.css";
import axios from "axios";
import Header from "../Header/Header";

//Driver CHANGE POINTS
class ChangePointsDriver extends React.Component {
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
      .get(`http://localhost:9000/driver/${this.props.match.params.id}`)
      .then((res) => {
        console.log("Driver -", res.data);
        res.data.forEach((driver) => {
          this.setState({ points: driver.points });
        });
      })
      .catch((err) => {
        console.log(err);
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
      .put(`http://localhost:9000/driver/updatedpoints/${e}`, newPoint)
      .then((res) => {
        console.log("Response -", res);
        alert("Points updated Successfully !");
        window.location = `/courtDriverDetails/${this.props.match.params.id}`;
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

export default ChangePointsDriver;
