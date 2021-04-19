import React, { Component } from 'react'
import { Card, Form, Button, Col, FormGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

const CardColor = { backgroundColor: '#f7f6e7' };

export default class Plat extends Component {
    constructor(props) {
        super(props);
        this.state = { nomplat: '', description: '', prix: '', categorie: '', coverPhotoURL:''};
        this.platChange = this.platChange.bind(this);
        this.submitPlat = this.submitPlat.bind(this);
    }

    submitPlat(event) {
        alert('Nom:' + this.state.nomplat + ' description:' + this.state.description + ' Prix:' + this.state.prix + ' Categorie:' + this.state.categorie + ' Photo:' + this.state.coverPhotoURL);
        event.preventDefault();

    }

    platChange(event) {

        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        return (<Card style={CardColor}>
            <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Ajouter un Plat</Card.Header>
            <Form onSubmit={this.submitPlat} id="MenuFormId">
                <Card.Body>


                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridNomplat">
                            <Form.Label>Nom:</Form.Label>
                            <Form.Control required
                                type="text" name="nomplat"
                                value={this.state.nomplat}
                                onChange={this.platChange}
                                className="bg-light text-dark"
                                placeholder="Entrer le nom du plat" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridDescription">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control required
                                type="text" name="description"
                                value={this.state.description}
                                onChange={this.platChange}
                                className="bg-light text-dark"
                                placeholder="Decrivez brièvement votre plat" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridPrix">
                            <Form.Label>Prix:</Form.Label>
                            <Form.Control required
                                type="number" name="prix"
                                value={this.state.prix}
                                onChange={this.platChange}
                                className="bg-light text-dark"
                                placeholder="Le prix en DH" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCategorie">
                            <Form.Label>Catégorie:</Form.Label>
                            <Form.Control required
                                type="text" name="categorie"
                                value={this.state.categorie}
                                onChange={this.platChange}
                                className="bg-light text-dark"
                                placeholder="catégorie" />
                        </Form.Group>
                        {/* <FormGroup as={Col}>
                            <Form.Label>Catégorie:</Form.Label>
                            <Form.Control as="select" placeholder="Choisir une catégorie">
                                <option>Plat principal</option>
                                <option>Dessert</option>
                            </Form.Control>
                        </FormGroup> */}
                        
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Cover Photo URL</Form.Label>
                            
                            <Form.Control 
                                type="text" name="coverPhotoURL"
                                value={this.state.coverPhotoURL}
                                onChange={this.platChange}
                                className={"bg-light text-dark"}
                                placeholder="Enter Book Cover Photo URL" />
                            
                        </Form.Group>
                    </Form.Row>
                </Card.Body>
                <Card.Footer style={{ "textAlign": "right" }}>
                    <Button
                        size="sm"
                        variant="success"
                        type="submit">
                        <FontAwesomeIcon icon={faSave} />Ajouter
                    </Button>
                </Card.Footer>

            </Form>

        </Card>
        )
    }

}