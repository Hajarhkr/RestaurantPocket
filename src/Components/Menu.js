import React, { Component } from "react";
import _, { map } from "underscore";
import "./style/menu.css";
import Card from "react-bootstrap/Card";
import MenuService from "../services/menu.service";
import "./globale";
class Menu extends Component {
  state = {
    menu: [],
    resultat: [],
    plats: [],
  };

  componentDidMount() {
    console.log("mon qr est " + global.qr);
    MenuService.getallmenu(global.qr).then(
      (response) => {
        const qr = response.data;
        this.setState({ qr });
        global.menu = qr;
        console.log(global.menu);
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  exist(item) {
    this.state.resultat = _.keys(
      _.countBy(item, function (item) {
        return item.categorie;
      })
    );

    this.state.plats = item.reduce(function (r, a) {
      r[a.categorie] = r[a.categorie] || [];
      r[a.categorie].push(a);
      return r;
    }, Object.create(null));
  }

  render() {
    {
      this.exist(global.menu);
    }

    return (
      <section className="containera">
        <div className="logo">
          <div className="hair"></div>
          <div className="menu">Menu Restaurant {global.namerestaut}</div>
          <div className="hair"></div>
        </div>
        {this.state.resultat.map((resultatone) => (
          <div className="row__posters">
            <h1 className="categories">{resultatone}</h1>
            <div className="containt">
              {global.menu.map(function (menuone) {
                if (menuone.categorie == resultatone)
                  return (
                    <Card className="plat">
                      <Card.Img
                        className="image"
                        variant="top"
                        src={menuone.image}
                      />
                      <Card.Body>
                        <Card.Title className="titre">
                          {menuone.nomrepas}
                        </Card.Title>
                        <Card.Title className="titreprix">
                          {" "}
                          Prix : <span>{menuone.prix}</span> DH
                        </Card.Title>
                        <Card.Text className="description">
                          {menuone.description}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
              })}
            </div>
          </div>
        ))}
      </section>
    );
  }
}
export default Menu;
