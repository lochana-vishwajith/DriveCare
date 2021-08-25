import React from 'react'
import Navbar from "../../navbarComponent/navbar";
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

    render() {
        const{RulesInList} =this.state
        return (
            <div>
                <div>
                    <Navbar topic1 = "Rules" portal = "-Rules In Category-"/>
                    {RulesInList.map((rules) => (
                        <CardView title = {rules.ruleName}  bty = "rule" description ={rules.description} cid ={rules.ruleNo} prid = {rules._id}/>
                    ))}
                    <Footer/>
                </div>
            </div>
        )
    }


}