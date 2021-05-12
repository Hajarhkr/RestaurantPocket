import React, { Component } from 'react'
import { Card, Form, Button, Col, FormGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast'
import './globale'

const CardColor = { backgroundColor: '#f7f6e7' };

export default class Plat extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            categories: [],
            show: false
        }
        this.platChange = this.platChange.bind(this);
        this.submitPlat = this.submitPlat.bind(this);
    };

    initialState = {
        id: '', nomrepas: '', description: '', prix: '', categorie: '', image: ''
    };

    componentDidMount = () => {
        const platId = +this.props.match.params.id;
        if (platId) {
            this.findPlatById(platId);
        }
        this.findAllCategories();

    }
    findAllCategories = () => {
        // axios.get("http://localhost:8080/api/categorie/qr/" + global.qr)
        //     .then(response => response.data)
        //     .then((data) => {
        // // const listCategorie = response.data;
        // console.log(this.state.categories);
        // this.setState.toString({
        //     categories: [{ value: '', display: 'Selectionner une catégorie' }]
        //         .concat(data.map(categorie => {
        //             return { value: categorie, display: categorie }
        //         }))
        // });
        //     },

        axios.get("http://localhost:8080/api/categorie/qr/" + global.qr)
            .then((response) => {
                const listCategorie = response.data;
                this.setState({ listCategorie });
                global.categorie = listCategorie;
                console.log(global.categorie);
            },

            )
            .then((data) => {
                // const listCategorie = response.data;
                console.log(global.categorie);
                this.setState.toString({
                    categories: [{ value: '', display: 'Selectionner une catégorie' }]
                        .concat(data.map(categorie => {
                            return { value: categorie, display: categorie }
                        }))
                })
                   
            }) 
            .catch((error) => {
                console.error("error-" + error)
            });
        }

    // findPlatById = platId => {
    //     fetch("http://localhost:8080/api/plats/" + platId)
    //         .then(response => response.json())
    //         .then((plat) => {
    //             if (plat = !null) {
    //                 this.setState({
    //                     id: plat.id,
    //                     nomrepas: plat.nomrepas,
    //                     description: plat.description,
    //                     prix: plat.prix,
    //                     categorie: plat.categorie,
    //                     coverPhotoURL: plat.coverPhotoURL,
    //                 });
    //             }
    //         }).catch((error) => {
    //             console.error("error-" + error)
    //         });
    // }



    findPlatById = (platId) => {
                    axios.get("http://localhost:8080/api/menus/" + platId)
                        .then(response => {
                            if (response.data != null) {
                                this.setState({
                                    id: response.data.id,
                                    nomrepas: response.data.nomrepas,
                                    description: response.data.description,
                                    prix: response.data.prix,
                                    categorie: response.data.categorie,
                                    image: response.data.image,
                                });
                            }
                        }).catch((error) => {
                            console.error("error-" + error)
                        });
                }

    resetPlat = () => {
                    this.setState(() => this.initialState);
                };

        allcategorie = (event) => {
            event.map((resultatone) => (
                <option>{resultatone.categorie}</option>
            )


            )
            console.log("hello")
        }

        submitPlat = event => {
            event.preventDefault();

            const plat = {
                nomrepas: this.state.nomrepas,
                description: this.state.description,
                prix: this.state.prix,
                categorie: this.state.categorie,
                image: this.state.image,
                qr: global.qr,
            };

            axios.post("http://localhost:8080/api/menus", plat)
                .then(response => {
                    if (response.data != null) {
                        this.setState({ "show": true, "methode": "post" })
                        setTimeout(() => this.setState({ "show": false }), 3000);
                    } else {
                        this.setState({ "show": false })
                    }
                });
            this.setState(this.initialState);
            console.log(plat);
        };

        platChange = event => {

            this.setState({
                [event.target.name]: event.target.value

            });
            console.log(event.target.value);
        };

        updatePlat = event => {
            event.preventDefault();

            const plat = {
                id: this.state.id,
                nomrepas: this.state.nomrepas,
                description: this.state.description,
                prix: this.state.prix,
                categorie: this.state.categorie,
                image: this.state.image
            };

            axios.put("http://localhost:8080/api/menus", plat)
                .then(response => {
                    if (response.data != null) {
                        this.setState({ "show": true })
                        setTimeout(() => this.setState({ "show": false }), 3000);
                        setTimeout(() => this.platList(), 3000);
                    } else {
                        this.setState({ "show": false })
                    }
                });
            this.setState(this.initialState);
            console.log(plat)
        };



        platList = () => {
            return this.props.history.push("/list")
        };


        render() {
            const { nomrepas, categorie, description, prix, image } = this.state;
            return (
                <div>
                    <div style={{ "display": this.state.show ? "block" : "none" }}>
                        <MyToast show={this.state.show} message={this.state.id ? "Plat modifié avec succés" : "Plat enregistré"} type={"success"} />
                    </div>
                    <Card style={CardColor}>
                        <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{' '}{this.state.id ? "Modifier ce plat" : "Ajouter un Plat"}</Card.Header>
                        <Form onReset={this.resetPlat} onSubmit={this.state.id ? this.updatePlat : this.submitPlat} id="MenuFormId">
                            <Card.Body>


                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridnomrepas">
                                        <Form.Label>Nom:*</Form.Label>
                                        <Form.Control required autoComplete="off"
                                            type="text" name="nomrepas"
                                            value={nomrepas}
                                            onChange={this.platChange}
                                            className="bg-light text-dark"
                                            placeholder="Entrer le nom du plat" />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridDescription">
                                        <Form.Label>Description:*</Form.Label>
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
                                    {/* <Form.Group as={Col} controlId="formGridCategorie">
                                    <Form.Label>Catégorie:</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="categorie"
                                        value={categorie}
                                        onChange={this.platChange}
                                        className="bg-light text-dark"
                                        placeholder="catégorie" />
                                </Form.Group> */}
                                    <FormGroup as={Col}>
                                        <Form.Label>Catégorie:</Form.Label>
                                        <Form.Control required
                                            as="select"
                                            name="categorie"
                                            value={categorie}
                                            custom onChange={this.platChange}>
                                            {global.categorie.map((resultatone) => (
                                                <option>{resultatone.categorie}</option>
                                            )
                                            )}


                                        </Form.Control>
                                    </FormGroup>

                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Cover Photo URL</Form.Label>

                                        <Form.Control
                                            type="text" name="image"
                                            value={image}
                                            onChange={this.platChange}
                                            className={"bg-light text-dark"}
                                            placeholder="Entrer l'url de la photo de couverture du plat" />

                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer style={{ "textAlign": "right" }}>
                                <Button
                                    size="sm"
                                    variant="success"
                                    type="submit">
                                    <FontAwesomeIcon icon={faSave} />{' '}{this.state.id ? "Update" : "Ajouter"}
                                </Button>{' '}
                                <Button
                                    size="sm"
                                    variant="info"
                                    type="reset">
                                    <FontAwesomeIcon icon={faUndo} />{' '}Reset
                           </Button>{' '}
                                <Button
                                    size="sm"
                                    variant="info"
                                    type="button"
                                    onClick={this.platList.bind()}>
                                    <FontAwesomeIcon icon={faList} />{' '} Liste de Plat
                           </Button>
                            </Card.Footer>

                        </Form>

                    </Card>

                </div>




            )
        }

    }