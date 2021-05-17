import React, { Component, state } from "react";
import { connect } from "react-redux";
import { deletePlat } from "../services/Plat/platActions";
import {
  Button,
  ButtonGroup,
  Card,
  Table,
  Image,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faTrash,
  faEdit,
  faStepBackward,
  faFastForward,
  faFastBackward,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

import MyToast from "./MyToast";
import { Link } from "react-router-dom";
import "./globale";
import axios from "axios";

const TableColor = { backgroundColor: "#FFFFFF" };
const CardColor = { backgroundColor: "#f7f6e7" };

class PlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plats: [],
      currentPage: 1,
      platPerPage: 4,
    };
  }

  componentDidMount() {
    this.findAllPlats();
  }

  findAllPlats() {
    axios
      .get("http://localhost:8080/api/menus/qr/" + global.qr)
      .then((response) => response.data)
      .then((data) => this.setState({ plats: data }));
  }

  deletePlat = (platId) => {
    this.props.deletePlat(platId);
    setTimeout(() => {
      if (this.props.platObject != null) {
        this.setState({ show: true });
        setTimeout(() => this.setState({ show: false }), 3000);
        this.findAllPlats(this.state.currentPage);
      } else {
        this.setState({ show: false });
      }
    }, 1000);

    // axios.delete("http://localhost:8080/api/menus/" + platId)
    //     .then(response => {
    //         if (response.data != null) {
    //             this.setState({ "show": true })
    //             setTimeout(() => this.setState({ "show": false }), 3000);

    //             this.setState({
    //                 plats: this.state.plats.filter(plat => plat.idrepas !== platId)
    //             });
    //         } else {
    //             this.setState({ "show": false })
    //         }
    //     })
  };

  changePage = (event) => {
    this.setState({
      [event.target.name]: parseInt(event.target.value),
    });
  };

  firstPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1,
      });
    }
  };

  lastPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.plats.length / this.state.platPerPage)
    ) {
      this.setState({
        currentPage: Math.ceil(
          this.state.plats.length / this.state.platPerPage
        ),
      });
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.plats.length / this.state.platPerPage)
    ) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });
    }
  };

  render() {
    const { plats, currentPage, platPerPage } = this.state;
    const lastIndex = currentPage * platPerPage;
    const firstIndex = lastIndex - platPerPage;
    const currentPlats = plats.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(plats.length / platPerPage);

    const pageNumCss = {
      width: "45px",
      border: "1px solid #17A288 ",
      color: "#17A288",
      textAlign: "center",
      fontWeight: "bold",
    };

    return (
      <div>
        <div>
          <div style={{ display: this.state.show ? "block" : "none" }}>
            <MyToast
              show={this.state.show}
              message={"Supprimé avec succés."}
              type={"danger"}
            />
          </div>
          <Card style={CardColor}>
            <Card.Header>
              <FontAwesomeIcon icon={faList} /> Liste de Plats
            </Card.Header>
            <Card.Body>
              <Table border hover striped variant="light" style={TableColor}>
                <thead>
                  <tr>
                    <th>Plat</th>
                    <th>Catégorie</th>
                    <th>Description</th>
                    <th>Prix</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plats.length === 0 ? (
                    <tr align="center">
                      <td colSpan="5"> {plats.length} plats enregistrés</td>
                    </tr>
                  ) : (
                    currentPlats.map((plat) => (
                      <tr key={plat.idrepas}>
                        <td>
                          {/* TO DO: deal with the picture text alignenment */}
                          <Image
                            src={plat.image}
                            rounded
                            width="25"
                            height="25"
                          />{" "}
                          {plat.nomrepas}
                        </td>
                        <td>{plat.categorie}</td>
                        <td>{plat.description}</td>
                        <td>{plat.prix} DH</td>
                        <td>
                          <ButtonGroup>
                            <Link
                              to={"edit/" + plat.idrepas}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={this.deletePlat.bind(this, plat.idrepas)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer>
              <div style={{ float: "left" }}>
                Page {currentPage} sur {totalPages}
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage == 1 ? true : false}
                      onClick={this.firstPage}
                    >
                      <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage == 1 ? true : false}
                      onClick={this.prevPage}
                    >
                      <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>
                  </InputGroup.Prepend>

                  <FormControl
                    style={pageNumCss}
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />

                  <InputGroup.Append>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage == totalPages ? true : false}
                      onClick={this.nextPage}
                    >
                      <FontAwesomeIcon icon={faStepForward} /> Next
                    </Button>{" "}
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage == totalPages ? true : false}
                      onClick={this.lastPage}
                    >
                      <FontAwesomeIcon icon={faFastForward} /> Last
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    platObject: state.plat,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deletePlat: (platId) => dispatch(deletePlat(platId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlatList);
