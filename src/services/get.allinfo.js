import axios from "axios";
const API_URL = "http://localhost:8080/all/";

class RestautService {
  getallinfo(mail) {
    return axios.get(API_URL + mail);
  }
}
export default new RestautService();
