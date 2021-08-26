import React from 'react'
import Navbar from "../../navbarComponent/navbar";
import Footer from "../../../Footer/Footer";
import axios from "axios";
import CardView from "../../../Cardview/Cardview";
import Modal from "react-bootstrap/Modal";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import TextArea from "devextreme-react/text-area";
import {toast} from "react-toastify";


export default class ViewRule extends React.Component{
constructor(props) {
    super(props);
    this.state={
        rules :[],
        show:false,
        popupVisible: false,
        uPoints:''
    }
}
    componentDidMount() {
        axios.get(`http://localhost:9000/rules/${this.props.match.params.id}`).then((res) => {
            console.log("res : ", res.data);
            this.setState({ rules: res.data });
        });
    }

    handlerModelCancel =() =>{
        this.setState({popupVisible:false});
    }

    handlerModelStart = () => {
        // this.setState({show:true});
        this.setState({ popupVisible: true });
    }
    handlerUpdate = (e) =>{

    const dataSet={
        demeritPoints:this.state.uPoints
    }
    e.preventDefault();
        axios
            .put(`http://localhost:9000/rules/update/${this.props.match.params.id}`, dataSet)
            .then((response) => {
                console.log("Data:", response);
                alert('Success Fully updated')
               window.location = `/viewrules/${this.props.match.params.id}`;
            })
            .catch((error) => {
                console.log("Data not Retriewed", error);
                alert("Sorry Cannot update now")
            });

    }
    handlerChanged =(e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }


    render() {

    const{rules,show} =this.state
        return (

            <div>

                <Navbar portal = "-VIEW RULES-" topic1 = "RULES & CATEGORIES" topic2 = "ADMIN DASHBOARD" link1 = '/rulescategorylist' link2 = '/' />

                {/*<Modal show={show} className="modal-dialog modal-dialog-centered modal-dialog-scrollable "  tabindex="10">*/}
                {/*    <Modal.Header><b> Update Rules Points</b></Modal.Header>*/}
                {/*    <Modal.Body>*/}
                {/*        <form action="#" className="form-body-rules">*/}
                {/*            <div className="row">*/}
                {/*                <div className="col">*/}
                {/*                    <div className="form-group form-part" >*/}
                {/*                        <label htmlFor="RegistrationNumber">Registration Number</label>*/}
                {/*                        <input type="text" name=""  className="form-control form-input-border"/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className="col">*/}
                {/*                    <div className="form-group form-part" >*/}
                {/*                        <label htmlFor="Mobile">Mobile</label>*/}
                {/*                        <input type="text" name = ""   className="form-control form-input-border"/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="row">*/}

                {/*                <div className="col">*/}
                {/*                    <div className="buttonHolder text-ligh pt-5">*/}
                {/*                        <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"*/}
                {/*                                id="btn_i text-light" onClick={this.handlerModelCancel}><b> cancel</b></button>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className="col">*/}

                {/*                    <div className="buttonHolder text-ligh pt-5">*/}
                {/*                        <button className="my-button text-center" value="Submit" title="I'm Feeling Lucky" name="lucky" type="submit"*/}
                {/*                                id="btn_i text-light"><b> Submit </b></button>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}

                {/*        </form>*/}

                {/*    </Modal.Body>*/}
                {/*    <Modal.Footer className="text-center">Click Cancel to Exit from Search menu</Modal.Footer>*/}
                {/*</Modal>*/}


                <Popup
                    visible={this.state.popupVisible}
                    onHiding={this.handlerModelCancel}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title="UPDATE POINTS"
                    container=".dx-viewport"
                    width={300}
                    height={280}
                >
                    <Position
                        at="center"
                        my="center"
                        of={this.state.positionOf}
                    />
                    <form onSubmit={this.handlerUpdate} className="form-body-rules">
                        <div className="row">
                            <div className="col">
                                <div className="form-group form-part" >
                                    <label htmlFor="Mobile"> ENTER DEMERITS POINTS</label>
                                    <input type="text" name = "uPoints"   className="form-control form-input-border" value={this.state.uPoints} onChange={this.handlerChanged}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col">
                                <div className="buttonHolder text-ligh pt-5">
                                    <button className="my-button text-center"  title="I'm Feeling Lucky" name="lucky" type="submit"
                                            id="btn_i text-light" ><b> UPDATE POINTS</b></button>
                                </div>
                            </div>
                        </div>

                    </form>


                    {/*<div className="dx-field" id="d-text-in">*/}
                    {/*    <TextArea*/}
                    {/*        height={150}*/}
                    {/*        name="newComments"*/}
                    {/*        value={this.state.newComments}*/}
                    {/*        onValueChanged={this.commentChange}*/}
                    {/*        showClearButton={true}*/}
                    {/*        placeholder="Add Comment here"*/}
                    {/*    />*/}
                    {/*    <div class="row">*/}
                    {/*        <div class="col text-center">*/}
                    {/*            <button*/}
                    {/*                type="button"*/}
                    {/*                className="btn btn-outline-danger btn-sm px-4 mt-3"*/}
                    {/*                onClick={this.onAddComment}*/}
                    {/*            >*/}
                    {/*                Add*/}
                    {/*            </button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </Popup>


                {rules.map((id) => (  <section className="p-5">
                    <div className="container">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-md p-5">
                                <p className="lead">
                                    <b> RULE NAME  - {id.ruleName} </b>
                                    <br></br>
                                    <b> RULE NUMBER - {id.ruleNo}</b>
                                    <br></br>
                                    <b> GAZETTE NUMBER -  {id.gazetteNo} </b>
                                    <br></br>
                                    <b> FINE AMOUNT  -  {id.fineAmount}</b>
                                    <br></br>
                                </p>

                            </div>

                            <div className="col-md p-5">

                                    <p className="lead">
                                        <b>  ADDED DATE - {id.date} </b>
                                        <br></br>
                                        <br></br>
                                        <b>DESCRIPTION - {id.description}</b>
                                     </p>
                            </div>

                        </div>

                        <row className="align-items-center justify ">

                            <p className="lead text-center ">
                                <b><h3>NUMBER OF DEMERIT POINTS -  {id.demeritPoints} </h3></b>
                            </p>

                        </row>


                    </div>
                    <hr/>

                </section>
                ))}

               <center> <div className="btn-group btn-group-lg text-center align-items-center px-5 buttonHolder pb-5" role="group" aria-label="...">
                    <button className="btn btn-outline-secondary text-light px-5 mx-5" type="button"
                            id="button-addon2" onClick={ this.handlerModelStart}>Update
                    </button>
                    <button className="btn btn-outline-secondary text-light px-5" type="button"
                            id="button-addon2">Delete
                    </button>
                </div>
               </center>
<br></br> <br></br> <br></br> <br></br>
                <Footer/>



            </div>




        )
    }

}
