
import { Container, Row, Jumbotron, Col } from 'react-bootstrap';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import NavigationBar from './Components/NavigationBar'
import Welcome from './Components/Welcome'
import Footer from './Components/Footer'
import Plat from './Components/Plat';
import PlatList from './Components/PlatList';
import Menu from './Components/Menu';
import Bilan from './Components/Bilan';
import Qr from './Components/Qr';
import Login from "./Components/login";
import Categorie from "./Components/Categorie";
import Signup from "./Components/Signup";
import Chef from "./Components/Chef";

import "./Components/globale";
import axios from 'axios';

const authentication = {
  getLogInStatus() {
    return global.logdin;
  },
};

// const checkLoginStatus = () => {
//   axios.get("http://localhost8080/authenticate", { withCredentials: true })
//     .then(response => {
//       console.log("logged in?", response)
//     }).catch(error => {
//       console.log("check login error", error)
//     })
// };
//  const compounentDidMount = () => {
//   this.checkLoginStatus();
// };



function SecuredRoute(props) {
  return (
    <Route
      path={props.path}
      render={(data) =>
        authentication.getLogInStatus() ? (
          <props.component {...data}></props.component>
        ) : (
          <Redirect to={{ pathname: "/login" }}></Redirect>
        )
      }
    ></Route>
  );
}

const App = () => {

  const marginTop = {
    marginTop: "20px"
  };


  return (



    <Router>
      <NavigationBar />
      <Route path="/login" exact component={Login} />
      <SecuredRoute path="/choixchef" component={Chef}></SecuredRoute>



      <Container>
        <Row>

          <Col lg={12} style={marginTop}>
            <Switch>


              <Route path="/Welcome" exact component={Welcome} />
              <Route path="/add" exact component={Plat} />
              <Route path="/edit/:id" exact component={Plat} />
              <Route path="/list" exact component={PlatList} />
              <Route path="/Home" exact component={Menu} />
              <Route path="/Qr" exact component={Qr} />
              <Route path="/Bilan" exact component={Bilan} />
              <Route path="/categorie" exact component={Categorie} />
              <Route path="/signup" exact component={Signup} />


            </Switch>

          </Col>

        </Row>
      </Container>


      {/* <Footer /> */}
    </Router>
  )

}

export default App;
