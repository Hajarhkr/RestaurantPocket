import axios from "axios";
const API_URL = "http://localhost:8080/api/commandes/qr/";

class allPlats {
  getallplats(qr, idcommande) {
    return axios.get(API_URL + qr + "/" + idcommande);
  }
}
export default new allPlats();
