import React, { Component } from 'react'
import { Card, Form, Button, Col, FormGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast'

const CardColor = { backgroundColor: '#f7f6e7' };

export default class Plat extends Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.platChange = this.platChange.bind(this);
        this.submitPlat = this.submitPlat.bind(this);
    }

    initialState = {
        nomplat: '', description: '', prix: '', categorie: '', coverPhotoURL: ''
    }

    resetPlat = () => {
        this.setState(() => this.initialState);
    }


    submitPlat = event => {
        event.preventDefault();

        const plat = {
            nomplat: this.state.nomplat,
            description: this.state.description,
            prix: this.state.prix,
            categorie: this.state.categorie,
            coverPhotoURL: this.state.coverPhotoURL
        };

        axios.post("http://localhost:8080/api/plats", plat)
            .then(response => {
                if (response.data != null) {
                    this.setState({"show":true})
                    setTimeout(()=> this.setState({"show":false}), 3000);
                } else{
                    this.setState({"show":false})
                }
            });
        this.setState(this.initialState);
    }

    platChange = event => {

        this.setState({
            [event.target.name]: event.target.value
        });
    };


    render() {
        const { nomplat, categorie, description, prix, coverPhotoURL } = this.state;
        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none"}}>
                    <MyToast children= {{show: this.state.show, message: "Plat enregistré.", type:"success"}} />
                </div>
                <Card style={CardColor}>
                    <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Ajouter un Plat</Card.Header>
                    <Form onReset={this.resetPlat} onSubmit={this.submitPlat} id="MenuFormId">
                        <Card.Body>


                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridNomplat">
                                    <Form.Label>Nom:</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="nomplat"
                                        value={nomplat}
                                        onChange={this.platChange}
                                        className="bg-light text-dark"
                                        placeholder="Entrer le nom du plat" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description:</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="description"
                                        value={description}
                                        onChange={this.platChange}
                                        className="bg-light text-dark"
                                        placeholder="Decrivez brièvement votre plat" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrix">
                                    <Form.Label>Prix:</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="number" name="prix"
                                        value={prix}
                                        onChange={this.platChange}
                                        className="bg-light text-dark"
                                        placeholder="Le prix en DH" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridCategorie">
                                    <Form.Label>Catégorie:</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="categorie"
                                        value={categorie}
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
                                <FontAwesomeIcon icon={faSave} />{' '}Ajouter
                    </Button>{' '}
                            <Button
                                size="sm"
                                variant="info"
                                type="reset">
                                <FontAwesomeIcon icon={faUndo} />{' '}Reset
                    </Button>
                        </Card.Footer>

                    </Form>

                </Card>
            </div>




        )
    }

}