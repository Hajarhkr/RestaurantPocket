import React, { Component } from 'react'
import { Button, ButtonGroup, Card, Table, Image } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import MyToast from './MyToast'
import {Link} from 'react-router-dom'

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


    deletePlat = (platId) => {
        axios.delete("http://localhost:8080/api/plats/" + platId)
            .then(response=>{
                if(response.data != null){
                    this.setState({"show":true})
                    setTimeout(()=> this.setState({"show":false}), 3000);
                    
                    this.setState({
                        plats: this.state.plats.filter(plat => plat.id !== platId)
                    });
                 } else{
                        this.setState({"show":false})
                    }
                ;
            }
                )
    };



    render() {


        return (
            <div>
                <div>
                <div style={{ "display": this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={"Supprimé avec succés."} type={"danger"} />
                </div>
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
                                            <Image src={plat.coverPhotoURL} rounded width="25" height="25" />{' '}
                                            {plat.nomplat}
                                        </td>
                                        <td>{plat.categorie}</td>
                                        <td>{plat.description}</td>
                                        <td>{plat.prix} DH</td>
                                        <td>
                                            <ButtonGroup>
                                            <Link to={"edit/"+plat.id} className="btn btn-sn btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>
                                                <Button size="sm" variant="outline-danger" onClick={this.deletePlat.bind(this, plat.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>

                    </Table>
                </Card.Body>
            </Card>
                </div>
            </div>
            
        )
    }

}