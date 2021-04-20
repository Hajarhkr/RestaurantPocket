
import { Container, Row, Jumbotron, Col } from 'react-bootstrap';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import NavigationBar from './Components/NavigationBar'
import Welcome from './Components/Welcome'
import Footer from './Components/Footer'
import Plat from './Components/Plat';
import PlatList from './Components/PlatList';
import Home from './Components/Home';
import Bilan from './Components/Bilan';
import Qr from './Components/Qr';

function App() {

  const marginTop = {
    marginTop: "20px"
  };


  return (
    
      <Router>
      <NavigationBar />
      <Container>
        <Row>

          <Col lg={12} style={marginTop}>
            <Switch>
              
              <Route path="/" exact component={Welcome}/>
              <Route path="/add" exact component={Plat}/>
              <Route path="/edit/:id" exact component={Plat}/>
              <Route path="/list" exact component={PlatList}/>
              <Route path="/Home" exact component={Home}/>
              <Route path="/Qr" exact component={Qr}/>
              <Route path="/Bilan" exact component={Bilan}/>
               
              
              
              
            </Switch>
           
          </Col>

        </Row>
      </Container>
      <Footer />
      </Router>
    
  );
}

export default App;
