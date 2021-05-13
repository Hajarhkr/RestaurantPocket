import React from 'react';
import { Container, Navbar, Col } from 'react-bootstrap';

export default class Welcome extends React.Component {
    render(){
        let fullYear = new Date().getFullYear();

        return (
            <Navbar fixed="bottom" bg="grey" variant="dark">
                <Container>
                    <Col lg="12" className="text-center text-muted">
                        <div>
                            {fullYear}-{fullYear+1}, All right reserved by Groupe A
                        </div>
                    </Col>
                </Container>
            </Navbar>

        )
    }
}            