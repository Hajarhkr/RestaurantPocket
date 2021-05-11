import axios from "axios";
const API_URL = "http://localhost:8080/api/Ecommande/qr/";

class BilanService {
  getallbilan(qr) {
    return axios.get(API_URL + qr);
  }
}
export default new BilanService();
