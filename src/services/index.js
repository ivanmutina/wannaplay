import axios from "axios";
import $router from "@/router";

let Auth = {
  async login(username, password) {
    let response = await Service.post("/auth", {
      username: username,
      password: password,
    });

    // data je axiosov atribut, uzmme podatke
    let user = response.data;

    // to spremi u localStorage stranice (ključ, vrijednost), pretvori u string
    localStorage.setItem("user", JSON.stringify(user));
    return true;
  },
  logout() {
    localStorage.removeItem("user");
  },
  getUser() {
    // uzimam korisnika iz localstorage (vratim u objekt)
    return JSON.parse(localStorage.getItem("user"));
  },
  getToken() {
    // uzmemo token koji je u localStorage-u
    let user = Auth.getUser();
    if (user && user.token) {
      return user.token;
    } else {
      return false;
    }
  },
  authenticated() {
    let user = Auth.getUser();
    if (user && user.token) {
      return true;
    }
    return false;
  },
  state: {
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

// instanca axios-a
let Service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

// Axios interseptori
Service.interceptors.request.use((request) => {
  try {
    let token = Auth.getToken();
    request.headers["Authorization"] = "Bearer " + token;
  } catch (e) {
    console.log(e);
  }

  return request;
});

Service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status == 401 || error.response.status == 403) {
      Auth.logout();
      $router.go();
    }
    return Promise.reject(error);
  }
);

export { Service, Auth };
