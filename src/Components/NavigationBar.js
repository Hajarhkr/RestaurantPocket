import { faSignInAlt, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import {connect} from "react-redux"
import {logoutUser} from "../services/user/auth/authActions"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, {Component} from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const navbar = {backgroundColor: '#c05812cc'};
// const navbar = {backgroundColor: '#f2a154'};

class NavigationBar extends Component {
    
    logout=() => {
     this.props.logoutUser();   
    }


    render() {
        const guestLinks = (
            <>
            <div className="mr-auto"></div>
            <Nav className="navbar-right">
                 <Link to={"signup"} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                 <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> {' '}Login</Link>
            </Nav>
            </>

        );
        const userLinks = (
            <>
            <Nav className="mr-auto">
                <Link to={"Home"} className="nav-link">Home</Link>
                <Link to={"Qr"} className="nav-link">Qr</Link>
                <Link to={"Bilan"} className="nav-link">Bilan</Link>
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
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            </Nav>
            <Nav className="navbar-right">
                 <Link to={"logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</Link>
                 
            </Nav>
            </>

        )

        return (
            <Navbar expand="lg" style={navbar} variant="dark">
                <Link to={"/"} className="navbar-brand">
                 RestaurantPocket 
                
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                 {this.props.auth.isLoggedIn ? userLinks : guestLinks}
                </Navbar.Collapse>
            </Navbar>
        );

    }


}
const mapStateToProps = state => {
    return {
      auth: state.auth
  
    };
  };

const mapDispatchToProps = dispatch => {
    return {
      logoutUser: () => dispatch(logoutUser()),
    }
  
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);