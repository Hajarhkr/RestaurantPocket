import React, { Component } from "react";
import RestautService from "../services/get.allinfo";
import "./globale";

export default class Chef extends Component {
  componentDidMount() {
    RestautService.getallinfo(global.email).then(
      (response) => {
        const data = response.data;
        this.setState({ data });

        console.log(data);
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
    return <div></div>;
  }
}
