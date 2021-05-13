import React, {Component} from 'react'
import {Jumbotron} from 'react-bootstrap';


export default class Welcome extends Component {
    render(){
        return (
            <Jumbotron >
            <h1>Bienvenue à RestaurantPocket</h1>
            <blockquote className=" blockquote mb-0">
                <p>
                Un bon repas adoucit l'esprit et régénère le corps. De son abondance découle une bienveillance chaleureuse.
                </p>
                <footer className="blockquote-footer">
                Frederick W. Hackwood
                </footer>
            </blockquote>
            </Jumbotron>

        );
    }

    
} 


