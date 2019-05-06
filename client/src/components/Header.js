import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";
import './css/Header.css';
import logo from "./logo2.png";

class Header extends Component {

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false: //no user logged in
        return (
          <li className="nav-item">
            <a className="btn btn-light" href="/auth/google" role="button">Login With Google</a>
          </li>
        );

      default:
        // the user is logged in
        return [
          <li className="nav-item" key="1">
            <Payments />
          </li>,
          <li className="nav-item" key="3" style={{ margin: "0 10px" }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li className="nav-item" key="2">
            <a className="btn btn-light" href="/api/logout" role="button">Logout</a>
          </li>
        ];
    }
  }
  render() {
    return (
      <nav>
        <div className="navbar navbar-expand-lg navbar-light">
          <Link
            to={this.props.auth ? "/surveys" : "/"} // ? == ternary operator (1st arg if true : 2nd arg if false)
            className="navbar-brand"
          >
            <img className="logo" src={logo} alt="onsurveys"/>
          </Link>
          <ul className="navbar-nav mr-auto">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
