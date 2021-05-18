import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faSave } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { Card, Form, Button, Col, FormGroup } from "react-bootstrap";
import "./globale";
import axios from "axios";
import MyToast from "./MyToast";

const CardColor = { backgroundColor: "#f7f6e7" };

export default class Plat extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.categorieChange = this.categorieChange.bind(this);
    this.submitCategorie = this.submitCategorie.bind(this);
  }

  initialState = {
    id: "",
    categorie: "",
    qr: "",
  };

  categorieChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  submitCategorie = (event) => {
    event.preventDefault();

    const categorie = {
      categorie: this.state.categorie,
      qr: global.qr,
    };

    axios
      .post("http://localhost:8080/api/categorie", categorie)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true, methode: "post" });
          setTimeout(() => this.setState({ show: false }), 3000);
        } else {
          this.setState({ show: false });
        }
      });
    this.setState(this.initialState);
    console.log(categorie);
  };

  render() {
    const { categorie } = this.state;
    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Catégorie ajoutée avec succés"}
            type={"success"}
          />
        </div>
        <Card style={CardColor}>
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} /> Ajouter une Catégorie
          </Card.Header>
          <Form onSubmit={this.submitCategorie} id="CategorieFormId">
            <Card.Body>
              <Form.Group>
                <Form.Label> Catégorie: *</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="text"
                  name="categorie"
                  value={categorie}
                  onChange={this.categorieChange}
                  className="bg-light text-dark"
                  placeholder="Entrer une catégorie"
                />
              </Form.Group>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Ajouter
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}
