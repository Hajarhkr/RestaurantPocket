import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { Link } from "react-router-dom";
import "./style/choix.css";
import bk from "./images/bk1.jpg";
import logo from "./images/logo.png";
import logout from "./images/logout.png";
const required = (value) => {
  if (!value) {
    return (
      <div className="alertalert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class administrateur extends Component {
  constructor(props) {
    super(props);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.state = {
      code: "",
      loading: false,
      message: "",
    };
  }

  onChangeCode(e) {
    this.setState({
      code: e.target.value,
    });
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    if (this.state.code === global.code) {
      console.log("good");
      this.props.history.push("/pageadmin");
    } else {
      this.setState({ message: "Le Code Saisi Est Invalide" });
      console.log("bad");
    }
  };

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
          <h2>Veulliez Saisir Votre Code de Verification</h2>
          <Form className="form" onSubmit={this.mySubmitHandler}>
            <div className="inputBx">
              <span>Code</span>
              <Input
                type="password"
                className="form-control"
                name="code"
                value={this.state.code}
                onChange={this.onChangeCode}
                validations={[required]}
              />
            </div>

            <button className="choixadmi">
              <span>Verifie</span>
            </button>

            <div style={{ color: "red", justifyContent: "center" }}>
              <br />
              {this.state.message}
            </div>
          </Form>
        </div>
        <div className="restautname">{global.namerestaut}</div>
        <Link className="logout" to={"/"}>
          <img src={logout} alt="logout" />
        </Link>
      </section>
    );
  }
}
