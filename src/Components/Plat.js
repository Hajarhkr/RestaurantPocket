import React, { Component, useEffect } from "react";
import { connect } from "react-redux";
import { savePlat, fetchPlat, updatePlat } from "../services/Plat/platActions";
import {
  Card,
  Form,
  Button,
  Col,
  FormGroup,
  InputGroup,
  Image,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyToast from "./MyToast";
import "./globale";

const CardColor = { backgroundColor: "#f7f6e7" };

class Plat extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      categories: [],
      show: false,
    };
    this.platChange = this.platChange.bind(this);
    this.submitPlat = this.submitPlat.bind(this);
  }

  initialState = {
    idrepas: "",
    nomrepas: "",
    description: "",
    prix: "",
    categorie: "",
    image: "",
  };

  componentDidMount = () => {
    this.findAllCategories();
    const platId = +this.props.match.params.idrepas;
    if (platId) {
      this.findPlatById(platId);
    }
  };

  findAllCategories = () => {
    axios
      .get("http://localhost:8080/api/categorie/qr/" + global.qr)
      .then((response) => {
        const listCategorie = response.data;
        this.setState({ listCategorie });
        global.categorie = listCategorie;
        console.log(global.categorie);
      })
      .catch((error) => {
        console.error("error-" + error);
      });
  };

  findPlatById = (platId) => {
    this.props.fetchPlat(platId);
    setTimeout(() => {
      let plat = this.props.platObject.plat;
      if (plat != null) {
        this.setState({
          idrepas: plat.idrepas,
          nomrepas: plat.nomrepas,
          description: plat.description,
          prix: plat.prix,
          categorie: plat.categorie,
          image: plat.image,
          qr: global.qr,
        });
      }
    }, 1000);
  };

  resetPlat = () => {
    this.setState(() => this.initialState);
  };

  submitPlat = (event) => {
    event.preventDefault();

    const plat = {
      nomrepas: this.state.nomrepas,
      description: this.state.description,
      prix: this.state.prix,
      categorie: this.state.categorie,
      image: this.state.image,
      qr: global.qr,
    };

    this.props.savePlat(plat);
    setTimeout(() => {
      if (this.props.savedPlatObject.plat != null) {
        this.setState({ show: true, methode: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
    console.log(this.state);
  };

  platChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.value);
  };

  updatePlat = (event) => {
    event.preventDefault();

    const plat = {
      idrepas: this.state.idrepas,
      nomrepas: this.state.nomrepas,
      description: this.state.description,
      prix: this.state.prix,
      categorie: this.state.categorie,
      image: this.state.image,
    };

    axios
      .put("http://localhost:8080/api/menus/" + plat.idrepas, plat)
      .then((response) => {
        if (response.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          setTimeout(() => this.platList(), 3000);
        } else {
          this.setState({ show: false });
        }
      });
    this.setState(this.initialState);
    console.log("hello");
  };

  platList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { nomrepas, categorie, description, prix, image, qr } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.id
                ? "Plat modifié avec succés"
                : "Plat enregistré avec success"
            }
            type={"success"}
          />
        </div>
        <Card style={CardColor}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "Modifier ce plat" : "Ajouter un Plat"}
          </Card.Header>
          <Form
            onReset={this.resetPlat}
            onSubmit={this.state.idrepas ? this.updatePlat : this.submitPlat}
            id="MenuFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridnomrepas">
                  <Form.Label>Nom:*</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="nomrepas"
                    value={nomrepas}
                    onChange={this.platChange}
                    className="bg-light text-dark"
                    placeholder="Entrer le nom du plat"
                  />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridDescription">
                  <Form.Label>Description:*</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="text"
                    name="description"
                    value={description}
                    onChange={this.platChange}
                    className="bg-light text-dark"
                    placeholder="Decrivez brièvement votre plat"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix:</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="number"
                    name="prix"
                    value={prix}
                    onChange={this.platChange}
                    className="bg-light text-dark"
                    placeholder="Le prix en DH"
                  />
                </Form.Group>
                <FormGroup as={Col}>
                  <Form.Label>Catégorie:</Form.Label>

                  <Form.Control
                    required
                    as="select"
                    name="categorie"
                    value={categorie}
                    custom
                    onChange={this.platChange}
                  >
                    {global.categorie.map((resultatone) => (
                      <option>{resultatone.categorie}</option>
                    ))}
                  </Form.Control>
                </FormGroup>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Cover Photo URL</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      type="text"
                      name="image"
                      value={image}
                      onChange={this.platChange}
                      className={"bg-light text-dark"}
                      placeholder="Entrer l'url de la photo de couverture du plat"
                    />
                    <InputGroup.Append>
                      {this.state.image !== "" && (
                        <Image
                          src={this.state.image}
                          roundedRight
                          width="40"
                          height="38"
                        />
                      )}
                    </InputGroup.Append>
                  </InputGroup>
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.idrepas ? "Update" : "Ajouter"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={this.platList.bind()}
              >
                <FontAwesomeIcon icon={faList} /> Liste de Plat
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    savedPlatObject: state.plat,
    updatedPlatObject: state.plat,
    platObject: state.plat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    savePlat: (plat) => dispatch(savePlat(plat)),
    updatePlat: (platId) => dispatch(updatePlat(platId)),
    fetchPlat: (plat) => dispatch(fetchPlat(plat)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Plat);
