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

    handlerAddCategory = () =>{
        window.location = '/addRulesCategories'
}

    render() {
        const{RulesCategoryList} =this.state
    return(

        <div>
            <Navbar topic1 = "RULES & CATEGORIES " link1 = "/rulescategorylist" link2 ="/" topic2 = "DASHBOARD" portal = "-CATEGORIES LIST-"/>
            {RulesCategoryList.map((category) => (
             <CardView title = {category.categoryName} severity = {category.severity} prid = {category._id} bty = "category" range = {category.range} description ={category.description} cid ={category.categoryNumber} />
            ))}


           <center> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5 pt-5" role="group" aria-label="...">
                <button className="btn btn-outline-secondary text-light px-5 mx-5" type="button" onClick={this.handlerAddCategory}
                        id="button-addon2">ADD CATEGORY
                </button>
            </div></center>


            <Footer/>
        </div>
    )


    }

}