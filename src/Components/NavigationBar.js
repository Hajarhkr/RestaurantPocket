import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const navbar = { backgroundColor: "#c05812cc" };
// const navbar = {backgroundColor: '#f2a154'};

export default class NavigationBar extends Component {
  render() {
    const guestLinks = (
      <>
        <Nav className="navbar-right">
          <Link to={"signup"} className="nav-link">
            <FontAwesomeIcon icon={faUserPlus} /> Register
          </Link>
          <Link to={"login"} className="nav-link">
            <FontAwesomeIcon icon={faSignInAlt} /> Login
          </Link>
        </Nav>
      </>
    );
    const userLinks = (
      <>
        <Nav className="mr-auto">
          <Link to={"Home"} className="nav-link">
            Home
          </Link>
          <Link to={"Qr"} className="nav-link">
            Qr
          </Link>
          <Link to={"Bilan"} className="nav-link">
            Bilan
          </Link>
          <NavDropdown title="Menu" id="collasible-nav-dropdown">
            <NavDropdown.Item href="add">Ajouter Plat</NavDropdown.Item>
            <NavDropdown.Item href="list">Liste de plat</NavDropdown.Item>
            <NavDropdown.Item href="categorie">
              Ajouter Catégorie
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </>
    );

    return (
      <Navbar expand="lg" style={navbar} variant="dark">
        <Link to={"/Welcome"} className="navbar-brand">
          RestaurantPocket
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to={"pageadmin"} className="nav-link">
              Home
            </Link>
            <Link to={"Qr"} className="nav-link">
              Qr
            </Link>
            <Link to={"Bilan"} className="nav-link">
              Bilan
            </Link>
            <NavDropdown title="Menu" id="collasible-nav-dropdown">
              <NavDropdown.Item>
                <Link style={{ color: "black" }} to={"add"}>
                  Ajouter Plat
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link style={{ color: "black" }} to={"list"}>
                  Liste de plat
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link style={{ color: "black" }} to={"Categorie"}>
                  Ajouter Catégorie
                </Link>
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>
          {/* logout not working */}
          <Nav className="navbar-right">
            <Link to={"/"} className="nav-link">
              <FontAwesomeIcon icon={faSignInAlt} /> Déconnexion
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
