import React from 'react'
import axios from "axios";

import CardView from "../../../Cardview/Cardview";
import Footer from "../../../Footer/Footer";
import Navbar from "../../navbarComponent/navbar"

export default class GetRulesCategoriesList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            RulesCategoryList: [],

        }
    }
    componentDidMount() {
        axios.get("http://localhost:9000/rulesCategory").then((res) => {
            console.log("res : ", res);
            this.setState({ RulesCategoryList: res.data });
        });
    }





    render() {
        const{RulesCategoryList} =this.state
    return(

        <div>
            <Navbar topic1 = "Category" portal = "-CATEGORIES LIST-"/>
            {RulesCategoryList.map((category) => (
             <CardView title = {category.categoryName} severity = {category.severity} prid = {category._id} bty = "category" range = {category.range} description ={category.description} cid ={category.categoryNumber} />
            ))}
            <Footer/>
        </div>
    )


    }

}