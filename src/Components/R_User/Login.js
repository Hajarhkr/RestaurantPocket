import React, { Component } from 'react'
import { connect } from "react-redux"
import { authenticateUser } from "../../services/user/auth/authActions"
import { Row, Col, Card, Form, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faSignInAlt, faEnvelope, faUndo } from '@fortawesome/free-solid-svg-icons'
import { Input } from '@material-ui/core'


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState
  }

  initialState = {
    email: '', passwordrestaut: '', error: ''
  }

  resetLoginForm = () => {
    this.setState(() => this.initialState);
  };

  credentialChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  validateUser = () => {
    this.props.authenticateUser(this.state.email, this.state.passwordrestaut)
    setTimeout(() => {
      if (this.props.auth.isLoggedIn) {
        return this.props.history.push("/pageadmin")
      } else {
        this.resetLoginForm();
        this.setState({ "error": "Email et mot de passe invalides" })
      }
    })
  }


  render() {
    const { email, passwordrestaut, error } = this.state;

    return (
      <Row className="justify-content-md-center">
        <Col xs={5}>
          {error && <Alert variant="danger">{error}</Alert>}
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faSignInAlt} />{' '}Login
            </Card.Header>
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup >
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <FormControl
                        required autocompplete="off"
                        type="text" name="email"
                        value={email}
                        className={"bg-dark text-white"}
                        placeholder="Entrer votre email"
                        onChange={this.credentialChange} />
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form.Group>


              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <InputGroup >
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faLock} />
                      </InputGroup.Text>
                      <FormControl
                        required autocompplete="off"
                        type="password"
                        name="passwordrestaut"
                        value={passwordrestaut}
                        className={"bg-white text-dark"}
                        placeholder="Entrer votre mot de passe"
                        onChange={this.credentialChange} />
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form.Group>


              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ "text-align": "right" }}>
              <Button
                size="sm"
                type="button"
                variant="success"
                onClick={this.validateUser}
                disabled={this.state.email.length === 0 || this.state.passwordrestaut.length === 0}>
                <FontAwesomeIcon icon={faSignInAlt} />{' '}Login
              </Button>{' '}
              <Button
                size="sm"
                type="button"
                variant="info"
                onClick={this.resetLoginForm}
                disabled={this.state.email.length === 0 && this.state.passwordrestaut.length === 0 && this.state.error.length === 0}>
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    )
  }
}



const mapStateToProps = state => {
  return {
    auth: state.auth

  };

};

const mapDispatchToProps = dispatch => {
  return {
    authenticateUser: (email, passwordrestaut) => dispatch(authenticateUser(email, passwordrestaut)),
  }

}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
