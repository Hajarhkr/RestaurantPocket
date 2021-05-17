import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import "./style/login.css";
import AuthService from "../services/auth.service.restaut";
import bk from "./images/bk1.jpg";
import logo from "./images/logo.png";
import "./globale";

const required = (value) => {
  if (!value) {
    return (
      <div className="alertalert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      passwordrestaut: "",
      loading: false,
      message: "",
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      passwordrestaut: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.email, this.state.passwordrestaut).then(
        () => {
          global.logdin = true;
          global.email = this.state.email;
          this.props.history.push("/choix");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <section>
        <div className="imgBx">
          <img src={bk} alt="background-img" />
        </div>
        <div className="contentBx">
          <div className="formBx">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <h2>Login</h2>
            <Form
              onSubmit={this.handleLogin}
              ref={(c) => {
                this.form = c;
              }}
            >
              <div className="inputBx">
                <span>Email</span>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeEmail}
                  validations={[required]}
                />
              </div>
              <div className="inputBx">
                <span>Password</span>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={this.state.passwordrestaut}
                  onChange={this.onChangePassword}
                  validations={[required]}
                />
              </div>
              <div className="inputBx">
                <button
                  className="form-control-button"
                  disabled={this.state.loading}
                >
                  {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
              <div className="inputBx">
                <p>
                  Don't have an account?
                  <a href={"/signup"} className="to_register">
                    {" "}
                    Sign up{" "}
                  </a>
                </p>
              </div>
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    <span className="message">
                      Your account name or password is incorrect.
                    </span>
                  </div>
                </div>
              )}
              <CheckButton
                style={{ display: "none" }}
                ref={(c) => {
                  this.checkBtn = c;
                }}
              />
            </Form>
          </div>
        </div>
      </section>
    );
  }
}