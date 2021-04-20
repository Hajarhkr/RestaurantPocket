import axios from "axios";

const API_URL = "http://localhost:8080/";

class AuthService {
  login(email, passwordrestaut) {
    return axios
      .post(API_URL + "authenticate", {
        email,
        passwordrestaut,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(nomrestaut, email, code, passwordrestaut) {
    return axios.post(API_URL + "register", {
      nomrestaut,
      email,
      code,
      passwordrestaut,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
