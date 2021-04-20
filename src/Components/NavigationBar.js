import React, {Component} from 'react';
import { Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';
import {Link} from 'react-router-dom'

const navbar = {backgroundColor: '#c05812cc'};
// const navbar = {backgroundColor: '#f2a154'};

export default class NavigationBar extends Component {
    
    render() {
        return (
            <Navbar expand="lg" style={navbar} variant="dark">
                <Link to={"/"} className="navbar-brand">
                 RestaurantPocket 
                
                </Link>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={"Home"} className="nav-link">Home</Link>
                        <Link to={"Qr"} className="nav-link">Qr</Link>
                        <Link to={"Bilan"} className="nav-link">Bilan</Link>
                        <NavDropdown title="Menu" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="add">Ajouter Plat</NavDropdown.Item>
                            <NavDropdown.Item  href="list">Liste de plat</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                        
                    </Nav>
                    {/* <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                       </Nav.Link>
                    </Nav> */}
                </Navbar.Collapse>
            </Navbar>
        );

    }


}
