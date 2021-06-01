import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Plat from "./Plat";
import PlatList from "./PlatList";
import Menu from "./Menu";
import Bilan from "./Bilan";
import Qr from "./Qr";
import Categorie from "./Categorie";
import Welcome from "./Welcome";

function pageadmin() {
  return (
    <div onkeydown="return (event.keyCode != 116)">
      {" "}
      <Router>
        {/* <NavigationBar /> */}
        <Switch>
          <Route path="/pageadmin" exact component={Menu} />
          <Route path="/Qr" exact component={Qr} />
          <Route path="/Bilan" exact component={Bilan} />
          <Route path="/add" exact component={Plat} />
          <Route path="/edit/:idrepas" exact component={Plat} />
          <Route path="/list" exact component={PlatList} />
          <Route path="/categorie" exact component={Categorie} />
          <Route path="/Welcome" exact component={Welcome} />
        </Switch>
      </Router>
    </div>
  );
}

export default pageadmin;
