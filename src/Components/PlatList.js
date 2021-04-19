import React, { Component } from 'react'
import { Button, ButtonGroup, Card, Table, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const TableColor = { backgroundColor: '#FFFFFF' };
const CardColor = { backgroundColor: '#f7f6e7' };

export default class PlatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plats: []
        }
    }

    componentDidMount() {
        this.findAllPlats();
    }

    findAllPlats() {
        axios.get("http://localhost:8080/api/plats")
            .then(response => response.data)
            .then((data) =>
                this.setState({ plats: data }));
    }



    render() {
        return (
            <Card style={CardColor}>
                <Card.Header><FontAwesomeIcon icon={faList} />  Liste de Plats</Card.Header>
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
                            {this.state.plats.length === 0 ?
                                <tr align="center">
                                    <td colSpan="5"> {this.state.plats.length} plats enregistrés</td>

                                </tr> :
                                this.state.plats.map((plat) => (
                                    <tr key={plat.id}>
                                        <td>
                                            <Image src={plat.coverPhotoURL} rounded width="25" height="25" />
                                            {plat.nomplat}
                                        </td>
                                        <td>{plat.categorie}</td>
                                        <td>{plat.description}</td>
                                        <td>{plat.prix} DH</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </Table>
                </Card.Body>
            </Card>
        )
    }

}