import React from 'react'
import Navbar from "../../../navbarComponent/navbar";
import Footer from "../../../Footer/Footer";
import axios from "axios";


export default class DeletedRulesList extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            RulesInList: [],
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:9000/deletedrules`).then((res) => {
            console.log("res : ", res);
            this.setState({ RulesInList: res.data });
        });
    }

    handlerView = (id) =>{

        window.location = `/drule/${id}`
    }

    render() {
        const{RulesInList} =this.state
        const RulesPortalName =`-DELETED RULES -`.toUpperCase();
        return (
            <div>
                <div>
                    <Navbar topic1 = "RULES & CATEGORIES" portal = {RulesPortalName} topic2 ="DASHBOARD" topic3 = "POLICE STATION REQUESTS" link2 = "/" link1 ="/rulescategorylist" link3="/preqs"/>
                    /                    {/*{RulesInList.map((rules) => (*/}
                    {/*    <CardView title = {rules.ruleName}  bty = "rule" description ={rules.description} cid ={rules.ruleNo} prid = {rules._id}/>*/}
                    {/*))}*/}

                    {RulesInList.map((rule) => (

                        <div className="card p-5">
                            <div className="card-body card border-dark mb-3 card-body-cus">
                                <div className="row">
                                    <td><h1><b>{rule.ruleName.toUpperCase()} - [{rule.gazetteNo.toUpperCase()}]</b></h1></td>
                                    <div className="col-8">
                                        <p className="lead">
                                            <br></br>
                                            <b> RULE NUMBER- {rule.ruleNo.toUpperCase()}</b>
                                            <br></br>
                                            <b>DEMERIT POINTS- {rule.demeritPoints}</b>
                                            <br></br>
                                            <b>FINE AMOUNT - {rule.fineAmount}</b>
                                            <br></br>
                                        </p>
                                    </div>

                                    <div className="col-4" border>
                                        <p className="lead">
                                            <button className="btn btn-outline-secondary text-light px-5" type="button"
                                                    id="button-addon2" onClick={() =>this.handlerView(rule._id)} pt-5>View
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))}

                    <hr/>
                    <br></br>
                    <br></br><br></br>
                    <br></br><br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <Footer/>
                </div>
            </div>
        )
    }
}