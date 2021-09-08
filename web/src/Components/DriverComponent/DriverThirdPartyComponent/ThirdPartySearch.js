import { Grid, Paper } from "@material-ui/core";
import axios from "axios";
import TextBox from "devextreme-react/text-box";
import React, { Component } from "react";
import "./ThirdPartySearch.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class ThirdPartySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dlicenceNo: "",
      driverDetails: [],
      found: true,
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    axios.get("http://localhost:9000/driver").then((res) => {
      console.log("data:", res.data);
      //   this.setState({ driverDetails: res.data });
      let dIDs = [];
      res.data.map((item, key) => {
        // console.log("id:", item.licenceNumber);
        dIDs.push(item.licenceNumber);
      });
      this.setState({ driverDetails: dIDs });
      console.log("id:", this.state.driverDetails);
    });
  }

  //   dLicenceChange = (e) => {
  //     this.setState({ dlicenceNo: e.value });
  //     console.log("Selected", this.state.dlicenceNo);
  //   };
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  searchForDriver = () => {
    let filterd = "";
    this.state.driverDetails.forEach((element) => {
      console.log("element", element);
      if (element == this.state.dlicenceNo) {
        filterd = element;
      } else {
        // alert("driver Not Found");
      }
    });
    if (filterd) {
      this.setState({ found: true });
      toast.success("Driver Found", {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.location = `/driver/${filterd}`;
    } else {
      this.setState({ found: false });
      toast.error("Driver Not Found", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    // const filteredDriver = this.state.driverDetails.filter(
    //   d => d === this.state.driverDetails
    // );
    // console.log(`Selected: ${filteredDriver} Input: ${this.state.dlicenceNo}`);
    // if (filteredDriver == this.state.dlicenceNo) {
    //   alert("Driver Found");
    // } else {
    //   alert("driver Not Found");
    // }
  };
  render() {
    return (
      <div>
        <div className="container d-margin-top">
          <div className="mt-1">
            <center>
              <div className="dt-reg">
                <i>Welcome to</i>
              </div>
              <div className="dt-dc">
                <b>DriveCare</b>
              </div>
            </center>
            <hr></hr>
          </div>
          <Grid>
            <Paper elevation={20}>
              <center>
                <h3 className="pt-5">Search Violation History</h3>
                <div className="container p-5">
                  <div className="input-group rounded">
                    <input
                      type="search"
                      className="form-control rounded"
                      placeholder="Enter Driver License Number"
                      aria-label="Search"
                      aria-describedby="search-addon"
                      name={"dlicenceNo"}
                      onChange={this.onChange}
                    />
                    <span
                      className="input-group-text border-0"
                      id="search-addon"
                      onClick={this.searchForDriver}
                    >
                      <i className="fas fa-search"></i>
                    </span>
                  </div>
                </div>
                <div className="mb-5">
                  {this.state.found == false ? (
                    <div>
                      <span>
                        <i className="bi bi-x-octagon"></i>
                      </span>
                      <b className="text-danger">Driver Not Found</b>
                    </div>
                  ) : null}
                </div>
              </center>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
