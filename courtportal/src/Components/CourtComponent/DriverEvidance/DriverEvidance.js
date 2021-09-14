import React from "react";
import "./DriverEvidance.css";
import axios from "axios";

class DriverEvidance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fines: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/fine/`)
      .then((res) => {
        console.log("fines -", res.data);

        const dFines = [];

        res.data.forEach((fine) => {
          if (fine.driverID == this.props.match.params.id) {
            dFines.push(fine);
          }
        });

        console.log("The drivers fines -", dFines);

        this.setState({ fines: dFines });
        console.log("the state", this.state.fines);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1 className="head">Driver Evidance</h1>
        <br />
        <br />
        <br />
        <br />
        <p>{this.props.evidance}</p>
      </div>
    );
  }
}

export default DriverEvidance;
