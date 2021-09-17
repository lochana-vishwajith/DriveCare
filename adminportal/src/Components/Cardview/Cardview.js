import React from 'react'
import "./CardView.css"

export default class CardView extends React.Component{
    handlerSubmit = (e) =>{
        e.preventDefault()
        if(this.props.bty == 'category' ){
            window.location = `/getrulescat/${this.props.prid}/${this.props.title}`
        }else if(this.props.bty == 'rule' ){
            alert('gamma'+this.props.prid)
            window.location = `/viewrules/${this.props.prid}`
        }
        //window.location = `/courtEditComment/${this.props.prid}`;
    }
    render() {
        return(
            <section className="p-2 px-5">

                <div className="container card-body-border">

                </div>
                <div className="card-body ">

                </div>
                <div className="card text-center">
                    <div className="card-header">
                        <h5 className="card-title">{this.props.title} <br/> <b>({this.props.cid})</b></h5>
                    </div>
                    <div className="row ">
                        <p className="card-text">
                            <b>RANGE - {this.props.range}</b>
                            <br></br>
                               {this.props.description}
                            <br></br>
                            <b> SEVERITY {this.props.severity}</b>
                        </p>
                        <div className="buttonHolder text-light">
                            <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" btype ={this.props.bty} type="submit"
                                    id="btn_i text-light" onClick={this.handlerSubmit}><b> VIEW RULES </b></button>
                        </div>

                    </div>
                </div>
            </section>

        )
    }

}