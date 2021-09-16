import React, { useContext, useState } from "react";
import "./DriverHeader.css";
import { UserContext } from "../../../App";
import { Link } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Popper from "@material-ui/core/Popper";

export default function DriverHeader() {
  const [show, setShow] = useState(true);
  const [logo] = useState(
    "https:firebasestorage.googleapis.com/v0/b/drivecare-466b1.appspot.com/o/images%2FprofileImages%2F1629491743966_DriveCare.png?alt=media&token=357fa383-7939-49b9-89d7-2e710f4b73bc "
  );
  const { state, dispatch } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  function logout() {
    localStorage.clear();
    window.location = "/";
  }

  function notify() {
    alert("notification");
  }

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
                setShow(!show);
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
                    <Badge badgeContent={17} color="error">
                      <NotificationsIcon onClick={handleClick} />
                    </Badge>
                    <Popper id={id} open={open} anchorEl={anchorEl}>
                      <Box sx={{ border: 5, p: 1, bgcolor: "text.disabled" }}>
                        <div class="card">
                          <div class="card-body">
                            This is some text within a card body.
                            <p class="card-text">
                              <small class="text-muted">
                                Last updated 3 mins ago
                              </small>
                            </p>
                            <hr />
                          </div>
                          <div class="card-body">
                            This is some text within a card body.
                            <p class="card-text">
                              <small class="text-muted">
                                Last updated 3 mins ago
                              </small>
                            </p>
                            <hr />
                          </div>
                          <div class="card-body">
                            This is some text within a card body.
                          </div>
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
                      logout();
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
                src={logo}
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
