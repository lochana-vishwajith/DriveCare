import { Grid, Link, Paper } from "@material-ui/core";
import React, { Component } from "react";
import "./OngoingTicket.css";

export default class OngoingTicket extends Component {
    constructor(props){
        super(props);
        this.state = {
            ticketDetails:[],

        }
    }

    componentDidMount(){

    }
  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <label>
              <h2>
                <b>Ongoing Tickets</b>
              </h2>
            </label>
            <hr />
          </div>
          <Grid>
            <Paper elevation={20} className="p-4">
              <div>
                <ul className="list-group list-group-flush">
                    <Link to={"/ticketOverview"}>
                    <li className="list-group-item d-flex justify-content-around">
                        <h4 className="p-3">High Speed</h4><p className="p-3">at Battaramulla</p><p className="p-3">Fine: Rs.1500</p><p className="p-3">08/05/2021</p>
                    </li>
                    </Link>
                    <li className="list-group-item d-flex justify-content-around">
                        <h4 className="p-3">Overtaking at zebra crossing</h4><p className="p-3">at Malabe</p><p className="p-3">Fine: Rs.1500</p><p className="p-3">08/05/2021</p>
                    </li>
                </ul>
              </div>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}
