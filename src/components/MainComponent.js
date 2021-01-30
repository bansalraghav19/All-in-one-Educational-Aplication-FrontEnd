import React, { Component, useState, useEffect, useMemo } from "react";
import {
  Switch,
  Route,
  Redirect,
  NavLink,
  Link,
  useHistory,
} from "react-router-dom";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import "./CSS/Main.css";
import { SUBJECTS, PHYSICS } from "../shared/subjects";
import { baseurl2 } from "../shared/baseurl";
import Chapter from "./ChapterComponent";
import Videoplayer from "./VideoplayerComponent";
import Query from "./queryComponent";
import Client from "./client/client";
import Profile from "./ProfileComponent";
import Test from "./TestComponent";
import Testform from "./Testform";

function Navbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="main-navbar-container">
      <div className="main-navbar-inner-container">
        <div className="main-navbar-content">
          <div className="main-app-logo">
            {/* <img src={baseurl2 + "assets/logo-main3.jfif"} /> */}
          </div>
          <div className="main-sep">|</div>
          <div className="main-page-name">{props.title}</div>
        </div>

        <div className="main-menu-buttons">
          <div>
            <a className="main-menu-title" href="#" onClick={handleClick}>
              My Profile
            </a>
          </div>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            aria-controls="customized-menu"
            aria-haspopup="true"
            getContentAnchorEl={null}
            open={Boolean(anchorEl)}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            targetOrigin={{ horizontal: "left", vertical: "top" }}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                history.push("./Profile");
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                localStorage.removeItem("token");
                props.changestate(false);
                props.changeHome(true);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}

function Sidebar(props) {
  return (
    <div className="main-sidebar">
      <NavLink
        onClick={() => {
          props.setNavbarTitle("Subject");
        }}
        className="nav-link main-sidebar-svg-image-container"
        to="/subject"
      >
        <img
          className="main-svg-image"
          src={baseurl2 + "assets/undraw_online2.svg"}
        />
        <div className="main-svg-image-text">Subject</div>
      </NavLink>
      <NavLink
        onClick={() => {
          props.setNavbarTitle("Mock Test");
        }}
        className="nav-link main-sidebar-svg-image-container"
        to="/test"
      >
        <img
          className="main-svg-image"
          src={baseurl2 + "assets/undraw_speech.svg"}
        />
        <div className="main-svg-image-text">Mock Test</div>
      </NavLink>
      <NavLink
        onClick={() => {
          props.setNavbarTitle("Chat");
        }}
        className="nav-link main-sidebar-svg-image-container"
        to="/query"
      >
        <img
          className="main-svg-image"
          src={baseurl2 + "assets/undraw_chat.svg"}
        />
        <div className="main-svg-image-text">Chat</div>
      </NavLink>
      <NavLink
        onClick={() => {
          props.setNavbarTitle("Profile");
        }}
        className="nav-link main-sidebar-svg-image-container"
        to="/profile"
      >
        <img
          className="main-svg-image"
          src={baseurl2 + "assets/undraw_profile.svg"}
        />
        <div className="main-svg-image-text">Profile</div>
      </NavLink>
    </div>
  );
}

function Subject(props) {
  var left = 5;

  const slideleft = () => {
    if (left > -340) {
      left -= 50;
      var tmp = left + "%";
      document.getElementsByClassName(
        "sub-chapter-inner-container"
      )[0].style.marginLeft = tmp;
    }
  };

  const slideright = () => {
    if (left < 5) {
      left += 50;
      let tmp = left + "%";
      document.getElementsByClassName(
        "sub-chapter-inner-container"
      )[0].style.marginLeft = tmp;
    }
  };

  return (
    <div className="sub-component-container">
      <div className="sub-header-img-container clearfix">
        <img
          className="sub-header-img-first"
          src="./assets/undraw_professor.svg"
        ></img>
        <img
          className="sub-header-img-second"
          src="./assets/undraw_board.svg"
        ></img>
      </div>
      <h1>Explore by subjects</h1>

      <div className="sub-subject-container">
        {SUBJECTS.map((subject) => {
          return (
            <Link className="sub-subject-link" to={`/subject/${subject.name}`}>
              <div className="sub-subject" id={subject.id} key={subject.id}>
                <h3>{subject.name}</h3>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="sub-chapter-container">
        <div className="sub-chapter-inner-container clearfix">
          {PHYSICS.map((chapter) => {
            if (chapter.name.length > 25)
              chapter.name = chapter.name.substring(0, 22) + "...";

            return (
              <div className="sub-chapter">
                <img src="./assets/sub.jpg"></img>
                <h3>{chapter.name}</h3>
                <div className="sub-chapter-content clearfix">
                  <h4>{chapter.learn}% Learnt</h4>
                  <h4>{chapter.practice}% Practiced</h4>
                </div>
              </div>
            );
          })}
        </div>

        <button className="sub-left-slider" onClick={slideleft}>
          <img src="./assets/garrow1.png"></img>
        </button>
        <button className="sub-right-slider" onClick={slideright}>
          <img src="./assets/garrow.png"></img>
        </button>
      </div>
    </div>
  );
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomID: "",
      title: "Subject",
    };
    this.changeRoomID = this.changeRoomID.bind(this);
    this.setNavbarTitle = this.setNavbarTitle.bind(this);
  }

  changeRoomID(id) {
    this.setState({ roomID: id }, () =>
      console.log("aayaa", this.state.roomID)
    );
  }

  setNavbarTitle(title) {
    this.setState({ title: title });
  }

  render() {
    const selectchapter = ({ match }) => {
      return <Chapter subname={match.params.subname} />;
    };

    const selecttopic = ({ match }) => {
      console.log(match.params.topic, match.params.chapter);
      return (
        <Videoplayer
          topic={match.params.topic}
          chapter={match.params.chapter}
        />
      );
    };

    return (
      <div className="main-full-page-container">
        <Navbar
          title={this.state.title}
          changestate={this.props.changestate}
          changeHome={this.props.changeHome}
        />
        <div className="main-container clearfix">
          <Sidebar setNavbarTitle={this.setNavbarTitle} />
          <div className="main-component-container">
            <Switch>
              {/* <Route exact path="/subject" component={() => <Subject />} />
              <Route path="/subject/:subname" component={selectchapter} />
              <Route path="/chapter/:chapter/:topic" component={selecttopic} />
              <Route exact path="/test" component={() => <Test />} />
              <Route
                path="/chat"
                component={() => <Client Room={this.state.roomID} />}
              />
              <Route
                path="/query"
                component={() => <Query changeRoomID={this.changeRoomID} />}
              /> */}
              <Route path="/Profile" component={() => <Profile />} />
              {/* <Route path="/test/:subname" component={() => <Testform />} /> */}
              <Redirect to="/profile" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
