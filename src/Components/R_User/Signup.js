import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Link } from "react-router-dom";
import AuthService from "../../services/auth.service.restaut"
import "../style/signup.css";
import bk from "../images/bk1.jpg";
import logo from "../images/logo.png";

const required = (value) => {
  if (!value) {
    return (
      <div className="alertalert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alertalert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alertalert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 20) {
    return (
      <div className="alertalert-danger" role="alert">
        The password must be between 6 and 20 characters.
      </div>
    );
  }
};

const vcode = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alertalert-danger" role="alert">
        The password must be between 3 and 20 characters.
      </div>
    );
  }
};

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      code: "",
      successful: false,
      message: "",
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onChangeCode(e) {
    this.setState({
      code: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.code,
        this.state.password
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
          alert("Votre compte a bien été bien créé");
          this.props.history.push("/");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }

  render() {
    return (
      <section>
        <div class="imgBx">
          <img src={bk} alt="background-img" />
        </div>
        <div class="contentBx">
          <div class="formBx">
            <div class="logo">
              <img src={logo} alt="logo" />
            </div>
            <h2>S'inscrire</h2>

            <Form
              onSubmit={this.handleRegister}
              ref={(c) => {
                this.form = c;
              }}
            >
              {!this.state.successful && (
                <div>
                  <div class="inputBx">
                    <span>
                      <span style={{ color: "red" }}>*</span>Nom De Restaurant
                    </span>
                    <Input
                      type="text"
                      className="form-control"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                      validations={[required, vusername]}
                    />
                  </div>

                  <div class="inputBx">
                    <span>
                      <span style={{ color: "red" }}>*</span>Email
                    </span>
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>

                  <div class="inputBx">
                    <span>
                      <span style={{ color: "red" }}>*</span>Code Verification
                    </span>
                    <Input
                      type="password"
                      className="form-control"
                      name="code"
                      value={this.state.code}
                      onChange={this.onChangeCode}
                      validations={[required, vcode]}
                    />
                    <p className="messageadmin">
                      Ce code est necessaire pour authentification
                      d'administrateur
                    </p>
                  </div>

                  <div class="inputBx">
                    <span>
                      <span style={{ color: "red" }}>*</span>Mot De Passe
                    </span>
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>

                  <div className="inputBx">
                    <button className="form-control-button">S'inscrire</button>
                  </div>
                  <div class="inputBx">
                    <p>
                      {" "}
                      Vous avez un compte?
                      <a href={"/login"} className="to_register">
                        {' '}Se Connecter ici
                      </a>
                    </p>
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="form-group">
                  <div
                    className={
                      this.state.successful
                        ? "alert alert-success"
                        : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {this.state.message}
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