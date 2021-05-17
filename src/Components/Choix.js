import React, { Component } from "react";
import { Link } from "react-router-dom";
import RestautService from "../services/get.allinfo";
import "./style/choix.css";
import bk from "./images/bk1.jpg";
import logout from "./images/logout.png";
import logo from "./images/logo.png";
import "./globale";

export default class Choix extends Component {
  componentDidMount() {
    RestautService.getallinfo(global.email).then(
      (response) => {
        const data = response.data;
        this.setState({ data });
        global.qr = data.qr;
        global.namerestaut = data.nomrestaut;
        global.code = data.code;
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  render() {
    return (
      <section>
        <div className="imgBx">
          <img src={bk} alt="background-img" />
        </div>
        <div className="box1">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          
          <h2>Voulez-vous s'authentifier comme </h2>
          <div className="box2">
            <Link to={"/admin"}>
              <button className="choix">
                <span>Administrateur</span>
              </button>
            </Link>
            <Link to={"/choixchef"}>
              <button className="choix">
                <span>Chef Cuisine</span>
              </button>
            </Link>
          </div>
        </div>
        <Link className="logout" to={"/"}>
          <img src={logout} alt="logout" />
        </Link>
      </section>
    );
  }
}