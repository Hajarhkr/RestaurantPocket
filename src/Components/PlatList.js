import React, { Component } from 'react'
import { Card, Table } from 'react-bootstrap'

const TableColor = {backgroundColor:'#FFFFFF'};
const CardColor = {backgroundColor:'#f7f6e7'};

export default class PlatList extends Component {
    render() {
        return (
            <Card  style={CardColor}>
                <Card.Header> Liste de Plats</Card.Header>
                <Card.Body>
                    <Table border hover striped variant="light" style={TableColor}>
                        <thead>
                            <tr>
                                <th>Plat</th>
                                <th>Catégorie</th>
                                <th>Description</th>
                                <th>Prix</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr align="center">
                                <td colSpan="4"> Pas de plat enregistré</td>
                               
                            </tr>
                        </tbody>

                    </Table>
                </Card.Body>
            </Card>
        )
    }

}