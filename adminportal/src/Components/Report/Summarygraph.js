import axios from "axios";
import React, { Component } from "react";
import {Bar} from 'react-chartjs-2';
import Navbar from "../navbarComponent/navbar";
import Footer from "../Footer/Footer";

export default class ReportGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report:'',
        };
    }



    componentDidMount() {
        axios
            .get(`http://localhost:9000/report/`)
            .then((result) => {
                console.log("Data:", result.data);
                this.setState({ report: result.data });
            })
            .catch((error) => {
                console.log("Data not Retrieved", error);
            });
    }

    render() {
        const { report } = this.state;
        const state = {
            labels: ['Drivers', 'Police Stations', 'Traffic Officers',],
            datasets: [
                {
                    label: 'USERS',
                    backgroundColor: 'rgba(178,34,34)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: [parseInt(report.drivers), parseInt(report.officers), parseInt(report.stations)]
                }
            ]
        }

        return (
            <div>
                <Navbar portal = "USER SUMMARY VISUALIZATION" topic1 = "SUMMARY" topic2 = "DASHBOARD" link1="/report" link2="/dashboard"></Navbar>
                <Bar
                    data={state}
                    options={{
                        title:{
                            display:true,
                            text:'USERS SUMMARY',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
                <Footer/>

            </div>
        );
    }
}
