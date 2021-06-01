import axios from "axios";
const API_URL = "http://localhost:8080/api/commandes/qr/";

class allcommandes {
  getallcommandes(qr) {
    return axios.get(API_URL + qr);
  }
}
export default new allcommandes();
