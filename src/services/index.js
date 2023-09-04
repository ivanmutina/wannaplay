import axios from "axios";
import $router from "@/router";

// instanca axios-a
let Service = axios.create({
  baseURL: "https://wannaplay-k2zg.onrender.com",
  timeout: 1000,
});

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
  async signup(new_username, new_password) {
    try {
      let response = await Service.post("/user", {
        username: new_username,
        password: new_password,
      });

      // data je axiosov atribut, uzmme podatke
      let user = response.data;

      // to spremi u localStorage stranice (ključ, vrijednost), pretvori u string
      localStorage.setItem("user", JSON.stringify(user));
      return true;
    } catch (err) {
      console.error("Error during registration:", err);
      // Obradite grešku (npr. prikažite poruku o grešci korisniku)
      return false;
    }
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
  async deleteUser(username) {
    try {
      const response = await axios.delete(`/user/${username}`);
      return response.data.success;
    } catch (error) {
      console.error("Error during account deletion:", error);
      return false;
    }
  },
  state: {
    get authenticated() {
      return Auth.authenticated();
    },
  },
};

// Axios interseptori, dodaj token u header
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
