// import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Bilan from "./Components/Bilan";
import Login from "./Components/R_User/Login";
import Signup from "./Components/R_User/Signup";
import Chef from "./Components/Chef";
import administrateur from "./Components/administrateur";
import Choix from "./Components/Choix";
import pageadmin from "./Components/pageadmin";
import "./Components/globale";

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

// function SecuredRoute(props) {
//   return (
//     <Route
//       path={props.path}
//       render={(data) =>
//         authentication.getLogInStatus() ? (
//           <props.component {...data}></props.component>
//         ) : (
//           <Redirect to={{ pathname: "/login" }}></Redirect>
//         )
//       }
//     ></Route>
//   );
// }

const App = () => {
  const marginTop = {
    marginTop: "20px",
  };

  return (
    <Router>
      <Route path="/" exact component={pageadmin} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/choix" exact component={Choix} />
      <Route path="/admin" exact component={administrateur} />
      <Route path="/choixchef" component={Chef}></Route>
      <Route path="/pageadmin" exact component={pageadmin} />
    </Router>
  );
};

export default App;