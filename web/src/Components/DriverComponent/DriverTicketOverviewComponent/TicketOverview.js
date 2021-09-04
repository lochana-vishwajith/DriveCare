import { Grid, Paper } from "@material-ui/core";
import React, { Component } from "react";
import "./TicketOverview.css";
import { Popup, Position, ToolbarItem } from "devextreme-react/popup";
import axios from "axios";
import TextArea from "devextreme-react/text-area";
import { toast } from "react-toastify";
import moment from "moment";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../../firebase/firebase";

export default class TicketOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      setOpen: false,
      popupVisible: false,
      positionOf: "",
      newComments: "",
      fine: [],
      fineAmount: "",
      fineDescription: "",
      fineRule: "",
      officers: "",
      evidences: [],
      image: "",
      evidenceURL: [],
      evidenceImgs: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `http://localhost:9000/driverComments/comments/${this.props.match.params.id}`
      )
      .then((response) => {
        console.log("Comment Data:", response);
        this.setState({ comments: response.data.comments });
        console.log(this.state.comments);
      })
      .catch((error) => {
        console.log("Data not Retriewed", error);
      });

    axios
      .get(`http://localhost:9000/fine/${this.props.match.params.id}`)
      .then((res) => {
        console.log("Fine Data:", res.data);
        this.setState({ fine: res.data });
        // console.log(this.state.fine.violationType[0].fineAmount);
        // this.setState({
        //   fineAmount: this.state.fine.violationType[0].fineAmount,
        //   fineDescription: this.state.fine.violationType[0].description,
        //   fineRule: this.state.fine.violationType[0].ruleName,
        //   officers: res.data,
        // });

        // console.log("Offi:", this.state.fine.Officers.map);
      })
      .catch((error) => {
        console.log("Violation Data not Retriewed", error);
      });

    axios
      .get(`http://localhost:9000/driverEvidence/${this.props.match.params.id}`)
      .then((response) => {
        console.log("Evidance Data:", response.data);
        this.setState({ evidenceImgs: response.data });
        console.log(this.state.evidenceImgs);
        this.state.evidenceImgs.map((item, index) =>
          item.evidence.map((i, k) => {
            console.log("EVIDANCE LOOP", i.evidenceURLs);
          })
        );
      })
      .catch((error) => {
        console.log("Data not Retriewed", error);
      });
  }

  handleOpen = () => {
    this.setState({ popupVisible: true });
  };

  handleClose = () => {
    this.setState({ popupVisible: false });
  };

  commentChange = (e) => {
    this.setState({ newComments: e.value });
  };

  onAddComment = () => {
    const dataSet = {
      comment: this.state.newComments,
    };
    axios
      .post(
        `http://localhost:9000/driverComments/${this.props.match.params.id}`,
        dataSet
      )
      .then(async () => {
        toast.success("Successfully Comment Added", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.log("Comment Adding Failed", error);
        toast.error("Comment Adding Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  onDeleteComment = (id) => {
    console.log("Delete Worked", id);

    axios
      .delete(`http://localhost:9000/driverComments/${id}`)
      .then((response) => {
        toast.success("Comment Deleted!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        window.location.reload();
      })
      .catch((error) => {
        console.log("Delete Error", error);
        toast.error("Comment Delete Failed! ", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  hnadlerFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        for (let i = 0; i < e.target.files.length; i++) {
          const newImage = e.target.files[i];

          this.setState({ image: reader.result });
          // this.setState({ evidences: e.target.files[0] });
          this.setState((prevState) => ({
            evidences: [...prevState.evidences, newImage],
          }));
        }
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  imageUpload = () => {
    const promises = [];
    const { evidences } = this.state;
    const date = Date.now();

    evidences.map((image) => {
      const uploadTask = storage
        .ref(`images/dirverEvidence/${date}_${image.name}`)
        .put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log("image first err", error);
          toast.error("Image Uploading Failed Failed", {
            position: toast.POSITION.TOP_RIGHT,
          });
        },
        async () => {
          await storage
            .ref("images/dirverEvidence/")
            .child(`${date}_${image.name}`)
            .getDownloadURL()
            .then((urls) => {
              console.log(urls);
              // this.setState({ evidenceURL: url });
              this.setState((prevState) => ({
                evidenceURL: [...prevState.evidenceURL, urls],
              }));
              setTimeout(this.onAddEvidence(), 1000);
              this.state.evidenceURL.map((url, i) => {
                console.log("ImageURL", url);
              });
              // console.log("ImageURL", this.state.evidenceURL);
            })
            .catch((err) => {
              console.log("image 2nd err", err);
              toast.error("Image Uploading Failed Failed", {
                position: toast.POSITION.TOP_RIGHT,
              });
            });
        }
      );
    });

    Promise.all(promises)
      .then(() => alert("All images uploaded"))
      .catch((err) => console.log("Promise Error", err));
  };

  onAddEvidence = () => {
    const dataSet = {
      evidenceURLs: this.state.evidenceURL,
    };
    console.log("Evidanse data set:", dataSet);
    axios
      .post(
        `http://localhost:9000/driverEvidence/${this.props.match.params.id}`,
        dataSet
      )
      .then(async () => {
        toast.success("Evidence Added Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // window.location.reload();
      })
      .catch((error) => {
        console.log("Evidence Adding Failed", error);
        toast.error("Evidence Adding Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="mt-3">
            <label>
              <h2>
                <b>Ticket Overview</b>
              </h2>
            </label>
            <hr />
          </div>
          <Grid>
            <Paper elevation={20} className="p-4">
              <div className="d-ticekt-grid">
                <div className="border rounded shadow p-3 mb-5 bg-body rounded p-3 d-ticket-clr">
                  <label>
                    <h3>Violation Details</h3>
                  </label>
                  {this.state.fine.map((item, index) => (
                    <div className="ml-2 d-violation-body">
                      <label>Violation : </label>
                      <b>
                        <ol>
                          {item.violationType.map((val, k) => (
                            <li className="d-inline"> {val.ruleName} |</li>
                          ))}
                        </ol>
                      </b>
                      <br />
                      <label>Location : </label>
                      <b>{item.place}</b>
                      <br />
                      <label>Description : </label>
                      <b>
                        {item.violationType.map((val, k) => val.description)}
                      </b>
                      <br />
                      <label>Vehicle Number : </label>
                      <b>{item.vehicelNo}</b>
                      <br />
                      <label>Fine : </label>
                      <b>
                        Rs. {item.violationType.map((val, k) => val.fineAmount)}
                      </b>
                      <br />
                      {item.courtDate ? (
                        <div>
                          <label>Court Date : </label>
                          <b>
                            {moment(item.courtDate).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </b>
                          <label>Court : </label>
                          <b>{item.CourtPlace}</b>
                        </div>
                      ) : (
                        <div>
                          <label>Fine Type : </label>
                          <b>On Premises</b>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border rounded p-3 d-ticket-clr shadow p-3 mb-5 bg-body rounded">
                  <label>
                    <h3>Officer Details</h3>
                  </label>
                  {this.state.fine.map((item, index) => (
                    <div className="ml-2 d-violation-body">
                      <div key={index}>
                        <label>Officer Name : </label>
                        <b>
                          <ul>
                            {item.Officers.map((i, k) => (
                              <li className="d-inline">{i.nameInitial} |</li>
                            ))}
                          </ul>
                        </b>
                        <br />
                        <label>Officer ID : </label>
                        <b>
                          <ul>
                            {item.Officers.map((i, k) => (
                              <li className="d-inline">{i.officerReg}</li>
                            ))}
                          </ul>
                        </b>
                        <br />
                        <label>Police Station : </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-comment-grid">
                <div className="border rounded  border-danger p-3">
                  <label className="d-flex justify-content-between">
                    <h3>Comments</h3>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm px-4"
                      onClick={this.handleOpen}
                    >
                      Add
                    </button>
                  </label>
                  <Popup
                    visible={this.state.popupVisible}
                    onHiding={this.handleClose}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title="Add Comment"
                    container=".dx-viewport"
                    width={300}
                    height={280}
                  >
                    <Position
                      at="center"
                      my="center"
                      of={this.state.positionOf}
                    />
                    <div className="dx-field" id="d-text-in">
                      <TextArea
                        height={150}
                        name="newComments"
                        value={this.state.newComments}
                        onValueChanged={this.commentChange}
                        showClearButton={true}
                        placeholder="Add Comment here"
                      />
                      <div class="row">
                        <div class="col text-center">
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm px-4 mt-3"
                            onClick={this.onAddComment}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </Popup>
                  {this.state.comments.length > 0 ? (
                    <div class="row d-flex justify-content-center mt-2">
                      {this.state.comments.map((item, index) => (
                        <div class="col-md-12 mb-1" key={index}>
                          <div class="card p-2">
                            <div class="d-flex justify-content-between align-items-center">
                              <div class="user d-flex flex-row align-items-center">
                                <span>
                                  <small class="font-weight-bold">
                                    {item.comment}
                                  </small>
                                </span>
                              </div>
                              <small>
                                {moment(item.commentDate).fromNow()}
                                <DeleteForeverOutlinedIcon
                                  className="d-delete"
                                  color="action"
                                  onClick={() => {
                                    this.onDeleteComment(item._id);
                                  }}
                                />
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div class="row d-flex justify-content-center mt-2">
                      <div class="card p-2">
                        <div className="card-body">
                          <h3 className="text-muted">
                            Add Your Comment Here...
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="border rounded  border-danger p-3">
                  <label className="d-flex justify-content-between">
                    <h3>Evidance</h3>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm px-4"
                      onClick={this.handleOpen}
                    >
                      Add
                    </button>
                  </label>
                  <Popup
                    visible={this.state.popupVisible}
                    onHiding={this.handleClose}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title="Upload Evidence"
                    container=".dx-viewport"
                    width={500}
                    height={380}
                  >
                    <Position
                      at="center"
                      my="center"
                      of={this.state.positionOf}
                    />
                    <div className="dx-field" id="d-text-in">
                      {this.state.evidences.map((url, i) => (
                        <img
                          key={i}
                          src={url || "http://via.placeholder.com/300"}
                          class="shadow-1-strong rounded mb-4"
                          id="evidences"
                          alt=""
                        />
                      ))}
                      {/* <img
                        src={this.state.image}
                        class="shadow-1-strong rounded mb-4"
                        id="evidences"
                        alt=""
                      /> */}
                      <input
                        type="file"
                        id="driverImgBtn"
                        name="profImage"
                        onChange={this.hnadlerFileChange}
                        multiple
                      />
                      <div class="row">
                        <div class="col text-center">
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm px-4 mt-3"
                            onClick={this.imageUpload}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </Popup>
                  <div>
                    {this.state.evidenceURL.map((url, i) => (
                      <img
                        key={i}
                        src={url || "http://via.placeholder.com/300"}
                        class="shadow-1-strong rounded mb-4"
                        id="evidences"
                        alt=""
                      />
                    ))}
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
