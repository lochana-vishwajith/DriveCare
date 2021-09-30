import React from 'react'
import Navbar from "../../../navbarComponent/navbar";
import CardView from "../../../Cardview/Cardview";
import Footer from "../../../Footer/Footer";
import axios from "axios";


export default class GetRulesCat extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            RulesInList: [],
        }
    }
    componentDidMount() {
        axios.get(`http://localhost:9000/rules/getrulesincat/${this.props.match.params.id}`).then((res) => {
            console.log("res : ", res);
            this.setState({ RulesInList: res.data });
        });
    }
    handlerAddRules =() =>{
        window.location = `/addRules/${this.props.match.params.id}`
    }

    handlerView = (id) =>{
        window.location = `/viewrules/${id}`
    }

    render() {
        const{RulesInList} =this.state
        const RulesPortalName =`-RULES & CATEGORIES OF ${this.props.match.params.cat}-`.toUpperCase();
        return (
            <div>
                <div>
                    <Navbar topic1 = "RULES & CATEGORIES" portal = {RulesPortalName} topic2 ="DASHBOARD" link2 = "/dashboard" link1 ="/rulescategorylist"/>
/                    {/*{RulesInList.map((rules) => (*/}
                    {/*    <CardView title = {rules.ruleName}  bty = "rule" description ={rules.description} cid ={rules.ruleNo} prid = {rules._id}/>*/}
                    {/*))}*/}
<div style={{paddingBottom:"20vh"}}>
                    {RulesInList.map((rule) => (
                        <div className="card p-5">
                            <div className="card-body card border-dark mb-3 card-body-cus">
                                <div className="row">
                                    <td><h1><b>{rule.ruleName} - [{rule.gazetteNo}]</b></h1></td>
                                    <div className="col-8">
                                        <p className="lead">
                                            <br></br>
                                            <b> RULE NUMBER- {rule.ruleNo}</b>
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

                    <center> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5" role="group" aria-label="...">
                        <button className="btn btn-outline-secondary text-light px-5 mx-5" type="button"
                                id="button-addon2" onClick={ this.handlerAddRules}>ADD NEW RULE
                        </button>
                    </div>
                    </center>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
</div>
                    <Footer/>
                </div>
            </div>
        )
    }
}