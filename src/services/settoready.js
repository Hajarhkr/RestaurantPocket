import axios from "axios";
const API_URL = "http://localhost:8080/api/commandes/update/";

class settoready {
  modify(idcommande) {
    return axios.put(API_URL + idcommande);
  }
}
export default new settoready();
