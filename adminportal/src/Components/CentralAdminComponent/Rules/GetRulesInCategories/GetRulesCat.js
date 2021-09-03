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
   /* _id: "6121db45cfa8d75d60908b2f"
​​​
    date: "2012-04-16T00:00:00.000Z"
​​​
    demeritPoints: 7
​​​
    description: "very bad wrong"
​​​
    fineAmount: 30
​​​
    gazetteNo: "3321-238"
​​​
    ruleName: "very high speeding"
​​​
    ruleNo: "AS28
*/
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
        return (
            <div>
                <div>
                    <Navbar topic1 = "RULES & CATEGORIES" portal = "-RULES IN CATEGORY-" topic2 ="DASHBOARD" link2 = "/" link1 ="/rulescategorylist"/>
/                    {/*{RulesInList.map((rules) => (*/}
                    {/*    <CardView title = {rules.ruleName}  bty = "rule" description ={rules.description} cid ={rules.ruleNo} prid = {rules._id}/>*/}
                    {/*))}*/}

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

                    <Footer/>
                </div>
            </div>
        )
    }


}