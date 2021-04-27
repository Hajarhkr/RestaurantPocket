import axios from "axios";
const API_URL = "http://localhost:8080/api/menus/qr/1/";

class MenuService {
  getallmenu(qr) {
    return axios.get(API_URL + qr);
  }
}
export default new MenuService();
