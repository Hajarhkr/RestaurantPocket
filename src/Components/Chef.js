import React, { Component, PropTypes } from "react";
import _, { map } from "underscore";
import "./style/chef.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import logo from "./images/logo.png";
import "./globale";
import allcommandes from "../services/allcommandes";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import settoready from "../services/settoready";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./globale";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
const sendCred = (idcommande) => {
  printDocument(idcommande);
};
const printDocument = (idcommande) => {
  settoready.modify(idcommande);
  const input = document.getElementById(idcommande);
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a6");
    pdf.addImage(imgData, "JPEG", 0, 0);
    pdf.save("download.pdf");
  });
  setTimeout(function () {
    window.location.reload(1);
  }, 1000);
};

class Chef extends Component {
  state = {
    menu: [],
    resultat: [{}],
    plats: [[]],
    place: "",
    commandenum: "",
  };

  componentDidMount() {
    allcommandes.getallcommandes(localStorage.getItem("myData")).then(
      (response) => {
        const answer = response.data;
        this.setState({ answer });
        global.commandes = answer;
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
    setTimeout(
      function () {
        this.setState({ show: true });
      }.bind(this),
      500
    );
  }

  exist(item) {
    this.state.resultat = _.keys(
      _.countBy(item, function (item) {
        return item.idcommande;
      })
    );

    this.state.plats = item.reduce(function (r, a) {
      r[a.idcommande] = r[a.idcommande] || [];
      r[a.idcommande].push(a);
      return r;
    }, Object.create(null));
  }

  render() {
    {
      this.exist(global.commandes);
    }

    return (
      <section className="page0">
        <div
          style={{
            height: "40px",
            width: "100%",
            backgroundColor: "#c05812cc",
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Link
            style={{ color: "white" }}
            to={"/"}
            className="nav-link"
            onClick={() => {
              localStorage.setItem("myData", 0);
              global.logdin = false;
              global.email = "";
              global.namerestaut = "";
              global.code = "";
              global.qr = "";
              global.menu = [];
              global.bilan = [];
              global.total = ["0"];
              global.categorie = [];
              global.commandes = [];
            }}
          >
            <FontAwesomeIcon icon={faSignInAlt} /> Déconnexion
          </Link>
        </div>

        <div className="logo">
          <div class="logoa">
            <img src={logo} alt="background-img" />
          </div>
          <div className="hair"></div>
          <div className="page0menu">Liste Des Commandes</div>
        </div>
        <div className="row__posters">
          <div
            className="containt"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {this.state.resultat.map((resultatone) => (
              <div
                style={{
                  marginRight: "20px",
                  marginBottom: "20px",
                }}
              >
                <Card className="plat" id={resultatone}>
                  <div>
                    <Card.Header
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={logo}
                        alt="background-img"
                        style={{ width: "35%" }}
                      />

                      <text style={{ fontSize: "1.3em", fontWeight: "500" }}>
                        Restaurant {global.namerestaut}
                      </text>
                    </Card.Header>
                    <ListGroup className="list-group-flush"></ListGroup>
                    <Card.Body style={{ backgroundColor: "#f7f6e7" }}>
                      <Card.Title
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        Table :{" "}
                        {this.state.plats[parseInt(resultatone)][0].place}
                      </Card.Title>
                    </Card.Body>

                    {global.commandes.map(function (commande) {
                      if (commande.idcommande == resultatone)
                        return (
                          <div>
                            <ListGroup className="list-group-flush">
                              <ListGroupItem
                                style={{ borderBottom: "solid 0.5px #f7f6e7" }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                  }}
                                >
                                  <div
                                    style={{
                                      flex: "1",
                                      color: "#c05812cc",
                                      fontSize: "25px",
                                    }}
                                  >
                                    {commande.quantite}
                                  </div>
                                  <div style={{ flex: "5", fontSize: "25px" }}>
                                    {commande.plat}
                                  </div>
                                  <div
                                    style={{
                                      flex: "4",
                                      textTransform: "uppercase",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {commande.categorie}
                                  </div>
                                  <div
                                    style={{
                                      flex: "3",
                                      color: "#c05812cc",
                                      fontSize: "20px",
                                    }}
                                  >
                                    {commande.prix} DH
                                  </div>
                                </div>
                              </ListGroupItem>
                            </ListGroup>
                          </div>
                        );
                    })}
                  </div>

                  <Button
                    className="ajouterb"
                    onClick={() => sendCred(resultatone)}
                  >
                    Imprimer
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className="hair"></div>
      </section>
    );
  }
}
export default Chef;
