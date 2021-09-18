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
import ImageViewer from "react-simple-image-viewer";
import { LoadIndicator } from "devextreme-react/load-indicator";

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
      popupVisibleEv: false,
      currentImage: 0,
      isViwerOpen: false,
      selectedImage: [],
      isImageAdded: false,
      loadIndicatorVisible: false,
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
          item.evidenceURLs.map((i, k) => {
            console.log("EVIDANCE LOOP", i);

            console.log("Item", item);
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

  handleOpenEvidence = () => {
    this.setState({ popupVisibleEv: true });
    this.setState({ selectedImage: [] });
    this.setState({ isImageAdded: false });
  };

  handleCloseEvidence = () => {
    this.setState({ popupVisibleEv: false });
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
    console.log(e.target.files);

    if (e.target.files) {
      let tempImages = [];
      Array.from(e.target.files).map((file) => {
        tempImages.push(URL.createObjectURL(file));
      });
      this.setState({ selectedImage: tempImages });
      this.setState({ isImageAdded: true });
    }
    console.log("images : ", this.state.selectedImage);
  };

  imageUpload = () => {
    this.setState({ loadIndicatorVisible: true });
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
              console.log("URL", urls);
              this.setState({ evidenceURL: urls });
              // this.setState((prevState) => ({
              //   evidenceURL: [...prevState.evidenceURL, urls],
              // }));
              setTimeout(this.onAddEvidence(), 1000);
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
      .then(() => {
        this.setState({ loadIndicatorVisible: false });
      })
      .catch((err) => console.log("Promise Error", err));
  };

  onAddEvidence = () => {
    this.setState({ loadIndicatorVisible: true });
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
        this.setState({ loadIndicatorVisible: false });
        // window.location.reload();
      })
      .catch((error) => {
        console.log("Evidence Adding Failed", error);
        toast.error("Evidence Adding Failed", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
  };

  openImageViewer = (index) => {
    console.log("Image Open", index);
    this.setState({ currentImage: index });
    this.setState({ isViewerOpen: true });
    this.state.isViewerOpen = true;
    console.log(this.state.isViwerOpen);
    console.log(this.state.currentImage);
  };

  closeImageViewer = () => {
    console.log("Image Close");
    this.setState({ currentImage: 0 });
    this.setState({ isViewerOpen: false });
  };

  deleteEvidence = (id, url) => {
    console.log("Deleted Data", id);
    console.log("Deleted URL", url);
    const data = {
      url: JSON.stringify(url),
    };

    axios
      .post(`http://localhost:9000/driverEvidence/evidenceDelete/${id}`, data)
      .then((response) => {
        console.log(response);
        toast.success("Evidance Deleted!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        window.location.reload();
      })
      .catch((error) => {
        console.log("Delete Error", error);
        toast.error("Evidance Delete Failed! ", {
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
              <div className="d-ticket-web">
                <div className="d-ticekt-grid">
                  <div className="border rounded shadow p-3 mb-5 bg-body rounded p-3 d-ticket-clr">
                    <label>
                      <h3>Violation Details</h3>
                    </label>
                    {this.state.fine.map((item, index) => (
                      <div>
                        <div class="col-md-12 mt-2">
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Violation</label>
                            </div>
                            <div class="col-sm-9 ">
                              <b>
                                <ul>
                                  {item.violationType.map((val, k) => (
                                    <li className="d-inline">
                                      {val.ruleName}
                                      <br />
                                    </li>
                                  ))}
                                </ul>
                              </b>
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Location</label>
                            </div>
                            <div class="col-sm-9">
                              <b>{item.place}</b>
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Description</label>
                            </div>
                            <div class="col-sm-9">
                              <b>
                                {item.violationType.map(
                                  (val, k) => val.description
                                )}
                              </b>
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Vehicle Number</label>
                            </div>
                            <div class="col-sm-9">
                              <b>{item.vehicelNo}</b>
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Fine</label>
                            </div>
                            <div class="col-sm-9">
                              <b>
                                Rs.{" "}
                                {item.violationType.map(
                                  (val, k) => val.fineAmount
                                )}
                              </b>
                            </div>
                          </div>
                          <hr />
                          {item.courtDate ? (
                            <div class="row">
                              <div class="col-sm-3">
                                <label class="mb-0">Court Date</label>
                              </div>
                              <div class="col-sm-4">
                                <b>
                                  {moment(item.courtDate).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                                </b>
                              </div>
                              <div class="col-sm-1">|</div>
                              <div class="col-sm-2">
                                <label class="mb-0">Court</label>
                              </div>
                              <div class="col-sm-1">
                                <b>{item.CourtPlace}</b>
                              </div>
                            </div>
                          ) : (
                            <div class="row">
                              <div class="col-sm-3">
                                <label class="mb-0">Fine Type</label>
                              </div>
                              <div class="col-sm-9">
                                <b>On Premises</b>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border rounded p-3 d-ticket-clr shadow p-3 mb-5 bg-body rounded">
                    <label>
                      <h3>Officer Details</h3>
                    </label>
                    {this.state.fine.map((item, index) => (
                      <div>
                        <div class="col-md-12 mt-2">
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Officer Name</label>
                            </div>
                            <div class="col-sm-9 ">
                              <b>
                                <ul>
                                  {item.Officers.map((i, k) => (
                                    <li className="d-inline-of">
                                      {i.nameInitial}
                                      <br />
                                    </li>
                                  ))}
                                </ul>
                              </b>
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Officer ID</label>
                            </div>
                            <div class="col-sm-9 ">
                              <b>
                                <ul>
                                  {item.Officers.map((i, k) => (
                                    <li className="d-inline-of">
                                      {i.officerReg}
                                      <br />
                                    </li>
                                  ))}
                                </ul>
                              </b>
                            </div>
                          </div>
                          <hr />
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Police Station</label>
                            </div>
                            <div class="col-sm-9">
                              <b>Battaramulla</b>
                            </div>
                          </div>
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
                        onClick={this.handleOpenEvidence}
                      >
                        Add
                      </button>
                    </label>
                    <Popup
                      visible={this.state.popupVisibleEv}
                      onHiding={this.handleCloseEvidence}
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
                        <input
                          type="file"
                          id="driverImgBtn"
                          name="profImage"
                          onChange={this.hnadlerFileChange}
                          multiple
                        />
                        <br />

                        {this.state.selectedImage.map((url, i) => (
                          <div className="image-holder">
                            <img
                              key={i}
                              src={url}
                              className="shadow-1-strong rounded mb-4 "
                              id="evidences"
                              alt=""
                            />
                          </div>
                        ))}
                        <br />
                        <div className="row">
                          <LoadIndicator
                            id="large-indicator"
                            visible={this.state.loadIndicatorVisible}
                            height={60}
                            width={60}
                          />
                        </div>
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
                      <br />
                      {this.state.evidenceImgs.map((item, index) =>
                        item.evidenceURLs.map((i, k) => (
                          <div className="responsive-imageview-d">
                            <div className="gallery-d">
                              <img
                                src={i}
                                alt="evidence"
                                key={k}
                                className="single-gallery-img-d"
                              />
                              <br />
                              <center>
                                <i
                                  className="far fa-trash-alt del-icon-d"
                                  onClick={() => {
                                    this.deleteEvidence(item._id, i);
                                  }}
                                ></i>
                              </center>
                            </div>
                          </div>
                        ))
                      )}
                      {/* {this.state.isViwerOpen && (
                        <ImageViewer
                          src={this.state.evidenceImgs}
                          currentIndex={this.state.currentImage}
                          disableScroll={false}
                          closeOnClickOutside={true}
                          onClose={this.closeImageViewer}
                        />
                      )} */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-ticket-responsive">
                <div className="border rounded shadow p-3 mb-5 bg-body rounded p-3 d-ticket-clr">
                  <label>
                    <h3>Violation Details</h3>
                  </label>
                  {this.state.fine.map((item, index) => (
                    <div>
                      <div class="col-md-12 mt-2">
                        <div class="row">
                          <div class="col-sm-3">
                            <label class="mb-0">Violation</label>
                          </div>
                          <div class="col-sm-9 ">
                            <b>
                              <ul>
                                {item.violationType.map((val, k) => (
                                  <li className="d-inline">
                                    {val.ruleName}
                                    <br />
                                  </li>
                                ))}
                              </ul>
                            </b>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <label class="mb-0">Location</label>
                          </div>
                          <div class="col-sm-9">
                            <b>{item.place}</b>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <label class="mb-0">Description</label>
                          </div>
                          <div class="col-sm-9">
                            <b>
                              {item.violationType.map(
                                (val, k) => val.description
                              )}
                            </b>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <label class="mb-0">Vehicle Number</label>
                          </div>
                          <div class="col-sm-9">
                            <b>{item.vehicelNo}</b>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <label class="mb-0">Fine</label>
                          </div>
                          <div class="col-sm-9">
                            <b>
                              Rs.{" "}
                              {item.violationType.map(
                                (val, k) => val.fineAmount
                              )}
                            </b>
                          </div>
                        </div>
                        <hr />
                        {item.courtDate ? (
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Court Date</label>
                            </div>
                            <div class="col-sm-4">
                              <b>
                                {moment(item.courtDate).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </b>
                            </div>
                            <div class="col-sm-1">|</div>
                            <div class="col-sm-2">
                              <label class="mb-0">Court</label>
                            </div>
                            <div class="col-sm-1">
                              <b>{item.CourtPlace}</b>
                            </div>
                          </div>
                        ) : (
                          <div class="row">
                            <div class="col-sm-3">
                              <label class="mb-0">Fine Type</label>
                            </div>
                            <div class="col-sm-9">
                              <b>On Premises</b>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border rounded p-3 d-ticket-clr shadow p-3 mb-5 bg-body rounded">
                  <label>
                    <h3>Officer Details</h3>
                  </label>
                  {this.state.fine.map((item, index) => (
                    <div>
                      <div class="col-md-12 mt-2">
                        <div class="row">
                          <div class="col-sm-3">
                            <label class="mb-0">Officer Name</label>
                          </div>
                          <div class="col-sm-9 ">
                            <b>
                              <ul>
                                {item.Officers.map((i, k) => (
                                  <li className="d-inline-of">
                                    {i.nameInitial}
                                    <br />
                                  </li>
                                ))}
                              </ul>
                            </b>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <label class="mb-0">Officer ID</label>
                          </div>
                          <div class="col-sm-9 ">
                            <b>
                              <ul>
                                {item.Officers.map((i, k) => (
                                  <li className="d-inline-of">
                                    {i.officerReg}
                                    <br />
                                  </li>
                                ))}
                              </ul>
                            </b>
                          </div>
                        </div>
                        <hr />
                        <div class="row">
                          <div class="col-sm-3">
                            <label class="mb-0">Police Station</label>
                          </div>
                          <div class="col-sm-9">
                            <b>Battaramulla</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                <div className="border rounded  border-danger p-3 mt-2">
                  <label className="d-flex justify-content-between">
                    <h3>Evidance</h3>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm px-4"
                      onClick={this.handleOpenEvidence}
                    >
                      Add
                    </button>
                  </label>
                  <Popup
                    visible={this.state.popupVisibleEv}
                    onHiding={this.handleCloseEvidence}
                    dragEnabled={false}
                    closeOnOutsideClick={true}
                    showCloseButton={true}
                    showTitle={true}
                    title="Upload Evidence"
                    container=".dx-viewport"
                    width={300}
                    height={180}
                  >
                    <Position
                      at="center"
                      my="center"
                      of={this.state.positionOf}
                    />
                    <div className="dx-field" id="d-text-in">
                      <input
                        type="file"
                        id="driverImgBtn"
                        name="profImage"
                        onChange={this.hnadlerFileChange}
                        multiple
                      />
                      <br />

                      {this.state.selectedImage.map((url, i) => (
                        <div className="image-holder">
                          <img
                            key={i}
                            src={url}
                            className="shadow-1-strong rounded mb-4 "
                            id="evidences"
                            alt=""
                          />
                        </div>
                      ))}
                      <br />
                      <div className="row">
                        <LoadIndicator
                          id="large-indicator"
                          visible={this.state.loadIndicatorVisible}
                          height={60}
                          width={60}
                        />
                      </div>
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
                    <br />
                    {this.state.evidenceImgs.map((item, index) =>
                      item.evidenceURLs.map((i, k) => (
                        <div className="responsive-imageview-d">
                          <div className="gallery-d">
                            <img
                              src={i}
                              alt="evidence"
                              key={k}
                              className="single-gallery-img-d"
                            />
                            <br />
                            <center>
                              <i
                                className="far fa-trash-alt del-icon-d"
                                onClick={() => {
                                  this.deleteEvidence(item._id, i);
                                }}
                              ></i>
                            </center>
                          </div>
                        </div>
                      ))
                    )}
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
