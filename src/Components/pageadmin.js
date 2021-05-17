import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Plat from "./Plat/Plat";
import PlatList from "./Plat/PlatList";
import Menu from "../Components/Plat/Categorie";
import Bilan from "./Bilan";
import Qr from "./Qr";
import Categorie from "./Plat/Categorie";




function pageadmin() {
  return (
    <div>
      {" "}
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/pageadmin" exact component={Menu} />
          <Route path="/Qr" exact component={Qr} />
          <Route path="/Bilan" exact component={Bilan} />
          {/* not working */}
          <Route path="/add" exact component={Plat} />
          <Route path="/edit/:idrepas" exact component={Plat} />
          <Route path="/list" exact component={PlatList} />
          <Route path="/categorie" exact component={Categorie} />
        </Switch>
      </Router>
    </div>
  );
}

export default pageadmin;