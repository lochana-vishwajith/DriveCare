import React, { Component } from "react";
import "./DriverHeader.css";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Popper from "@material-ui/core/Popper";
import axios from "axios";
import AuthContext from "../../../Reducer/UseReduser";
import moment from "moment";

class DriverHeader extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      logo: "https:firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc",
      show: true,
      notification: [],
      anchorEl: null,
      open: false,
      notificationCount: 0,
    };

    this.getNotificationCount = this.getNotificationCount.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
    this.callNotifications = this.callNotifications.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  componentDidMount() {
    this.getNotifications();
    this.callNotifications();
  }
  flipOpen = () => this.setState({ ...this.state, open: !this.state.open });
  handleClick = (event) => {
    this.state.ancherEl
      ? this.setState({ anchorEl: null })
      : this.setState({ anchorEl: event.currentTarget });
    this.flipOpen();
    this.setState({ notificationCount: null });
    if (this.state.notification) {
      setTimeout(() => {
        this.removeNotification();
      }, 240000);
    }
    setTimeout(() => {
      this.removeNotification();
    }, 24000);
  };

  logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  getNotifications() {
    axios
      .get(
        `http://localhost:9000/notifications/${localStorage.getItem(
          "DriverID"
        )}`
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ notification: res.data });
        this.getNotificationCount();
      })
      .catch((err) => {
        console.log("Notifications not retrived", err);
      });
  }

  getNotificationCount() {
    this.state.notification.map((item, index) => {
      item.map((i, k) =>
        this.setState({
          notificationCount: this.state.notificationCount + 1,
        })
      );
    });
    console.log("NOTY COUNT;", this.state.notificationCount);
  }

  callNotifications() {
    setInterval(() => {
      this.getNotifications();
    }, 300000);
  }

  removeNotification() {
    if (this.state.notification) {
      this.state.notification.map((item, index) => {
        item.map((i, k) =>
          axios
            .put(`http://localhost:9000/notifications/${i._id}`)
            .then((response) => {
              console.log("Data:", response);
              console.log("Notification removed");
              this.setState({ notification: null });
            })
            .catch((error) => {
              console.log("Notification not removed", error);
            })
        );
      });
    }
  }

  render() {
    const { show, logo } = this.state;
    const { isAutheticated } = this.context;
    const open = this.state.anchorEl === null ? false : true;
    const id = this.state.open ? "simple-popper" : null;
    console.log("Anchor:", this.state.anchorEl);
    console.log(this.state.open);
    return (
      <div>
        {localStorage.getItem("DriverID") && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand text-info" to="#">
                <img src={logo} id="driveLoginLogoH" alt="" />
              </Link>
              <button
                className="navbar-toggler border border-info text-info"
                onClick={() => {
                  this.setState({ show: !show });
                }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className={
                  show
                    ? "collapse navbar-collapse"
                    : "collapse navbar-collapse active"
                }
                id="navbarNav"
              >
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <Badge
                        badgeContent={this.state.notificationCount}
                        color="error"
                      >
                        <NotificationsIcon
                          aria-describedby={id}
                          onClick={(event) => this.handleClick(event)}
                        />
                      </Badge>
                      <Popper
                        id={id}
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        className="popper"
                      >
                        <Box sx={{ border: 5, p: 1, bgcolor: "text.disabled" }}>
                          <div class="card">
                            {this.state.notification != null ? (
                              this.state.notification.map((item, index) =>
                                item.map((i, k) => (
                                  <div class="card-body" key={k}>
                                    {i.description}
                                    <p class="card-text">
                                      <small class="text-muted">
                                        {moment(i.createdDate).fromNow()}
                                      </small>
                                    </p>
                                  </div>
                                ))
                              )
                            ) : (
                              <div class="card-body">You catch up all</div>
                            )}
                          </div>
                        </Box>
                      </Popper>
                    </IconButton>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="/driverDisplay"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/ongoingTickets">
                      My Tickets
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/summary">
                      Summary
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="#"
                      onClick={() => {
                        this.logout();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
        {!localStorage.getItem("DriverID") && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="#">
                <img
                  src={this.state.logo}
                  class="w-100 shadow-1-strong rounded mb-4"
                  id="driveLoginLogoH"
                  alt=""
                />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/driverRegister">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/search">
                      Search Driver
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        )}
      </div>
    );
  }
}
export default DriverHeader;
