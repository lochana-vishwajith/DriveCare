import React from "react";
import "./DriverEvidance.css";
import axios from "axios";
import Header from "../Header/Header";

class DriverEvidance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fines: [],
      evidanceURL: [],
      evidance: [],
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:9000/driverEvidence/${this.props.match.params.id}`)
      .then((response) => {
        console.log("Evidance Data:", response.data);

        this.setState({ evidance: response.data });
      })
      .catch((error) => {
        console.log("Data not Retriewed", error);
      });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <h1 className="head">Driver Evidance</h1>
          <br />

          {this.state.evidance.map((e, k) => (
            <div key={k}>
              <img className="eviImage" src={e.evidenceURLs} />
              <br />
              <br />
              <br />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default DriverEvidance;
