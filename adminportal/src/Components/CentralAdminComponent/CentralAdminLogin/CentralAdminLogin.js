import { Grid, Paper, Link } from "@material-ui/core";
import TextBox from "devextreme-react/text-box";
import Validator, { RequiredRule } from "devextreme-react/validator";
import React, { Component } from "react";

import Button from "../../ButtonComponent/button";

export default class CentralAdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
                officerNo:'',
                password:''

        }
    }

    nameChanged = (e) => {
        this.setState({officerNo: e.value });
    };

    onPasswordChanged = (e) => {
        this.setState({ password: e.value });
    };

    handlerSubmit = (e) =>{
        e.preventDefault();
        console.log('state',this.state);
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="mt-1">
                        <center>
                            <div className="d-reg">
                                <i>Welcome to</i>
                            </div>
                            <div className="d-dc">
                                <b>DriveCare CentralAdmin Login</b>
                            </div>
                        </center>
                        <hr></hr>
                    </div>
                    <Grid>
                        <Paper elevation={20}>
                            <div className="d-center-form">
                                <div className="d-center-input">
                                    <div className="dx-fieldset">
                                        <div className="dx-field" id="d-text-in">
                                            <label id="labelName">Admin Number</label>
                                            <TextBox
                                                name="adminNumber"
                                                 value={this.state.officerNo}
                                                onValueChanged={this.nameChanged}
                                                showClearButton={true}
                                            >
                                                <Validator>
                                                    <RequiredRule message="Licence Number is required" />
                                                </Validator>
                                            </TextBox>
                                        </div>
                                        <div className="dx-field" id="d-text-in">
                                            <label id="labelName">Password</label>
                                            <TextBox
                                                mode="password"
                                                name="password"
                                                value={this.state.password}
                                                showClearButton={true}
                                                onValueChanged={this.onPasswordChanged}
                                            >
                                                <Validator>
                                                    <RequiredRule message="Password is required" />
                                                </Validator>
                                            </TextBox>
                                        </div>
                                        <div className="d-btn-aling">
                                            <div className="d-btnReg-long">
                                                <Button
                                                    id={"driverReg"}
                                                    value={"Sign In"}
                                                    classname={"driverRegBtn"}
                                                    type={"submit"}
                                                    onSubmit={this.handlerSubmit}
                                                />
                                            </div>
                                            <div className="d-btnReg-short">
                                                <Button
                                                    id={"driverReg"}
                                                    value={"Sign In"}
                                                    classname={"driverRegBtn-short"}
                                                    type={"submit"}
                                                    onSubmit={this.onSubmit}
                                                />
                                            </div>
                                            <div className="mt-3 d-link">
                                                    <small>
                                                       Don't Have a Account? <b>Please Find your Admin Password From the Organization</b>
                                                    </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Paper>
                    </Grid>
                </div>
            </div>
        );
    }
}
