import { Grid, Paper } from "@material-ui/core";
import React, { Component } from "react";
import "./TicketOverview.css";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import axios from "axios";
import TextBox from "devextreme-react/text-box";

export default class TicketOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      setOpen: false,
      popupVisible: false,
      positionOf: "",
      newComments: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/driverComments/611ea43896506623c8d173a0")
      .then((response) => {
        console.log("Data:", response);
        this.setState({ comments: response.data });
        console.log(this.state.comments);
      })
      .catch((error) => {
        console.log("Data not Retriewed", error);
      });
  }

  handleOpen = () => {
    this.setState({ popupVisible: true });
  };

  handleClose = () => {
    this.setState({ popupVisible: false });
  };
  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <label>
              <h2>
                <b>Ticket Overview</b>
              </h2>
            </label>
            <hr />
          </div>
          <Grid>
            <Paper elevation={20} className="p-4">
              <div className="d-ticekt-grid">
                <div className="border rounded  border-danger p-3">
                  <label>
                    <h3>Violation Details</h3>
                  </label>
                  <div className="ml-2">
                    <label>Violation : </label>
                    <b> Speeding</b>
                    <br />
                    <label>Location : </label>
                    <b> Malabe</b>
                    <br />
                    <label>Description : </label>
                    <b> Speed is over 120 kmph on the main road.</b>
                    <br />
                    <label>Fine : </label>
                    <b> Rs.1500.00</b>
                    <br />
                    <label>Court Date : </label>
                    <b> 25/09/2021</b>
                    <br />
                  </div>
                </div>
                <div className="border rounded  border-danger p-3">
                  <label>
                    <h3>Officer Details</h3>
                  </label>
                </div>
              </div>
              <div className="d-comment-grid">
                <div className="border rounded  border-danger p-3">
                  <label className="d-flex justify-content-between">
                    <h3>Comments</h3>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm px-4"
                      onClick={this.handleOpen}
                    >
                      Add
                    </button>
                  </label>
                  <Popup
                    visible={this.state.popupVisible}
                    onHiding={this.handleClose}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title="Add Comment"
                    container=".dx-viewport"
                    width={300}
                    height={280}
                  >
                    <Position
                      at="center"
                      my="center"
                      of={this.state.positionOf}
                    />
                    <div className="dx-field" id="d-text-in">
                      <TextBox
                        name="newComments"
                        value={this.state.newComments}
                        onValueChanged={this.fNameChange}
                        showClearButton={true}
                        placeholder="Add Comment here"
                      >
                      </TextBox>
                      <button
                          type="button"
                          class="btn btn-outline-danger btn-sm px-4"
                        >
                          Add
                        </button>
                    </div>
                  </Popup>
                  <ul >
                    <li className="d-flex">
                      <p>Test</p><p className="float-right">date</p>
                      <hr/>
                    </li>
                  </ul>
                </div>
                <div className="border rounded  border-danger p-3">
                  <label className="d-flex justify-content-between">
                    <h3>Evidance</h3>
                    <button
                      type="button"
                      class="btn btn-outline-danger btn-sm px-4"
                    >
                      Add
                    </button>
                  </label>
                </div>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
