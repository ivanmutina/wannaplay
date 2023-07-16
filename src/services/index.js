import axios from "axios";

// instanca axios-a
let Service = axios.create({
  baseURL: "http://localhost:3000",
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
  logout() {
    localStorage.removeItem("user");
  },
  getUser() {
    // uzimam korisnika iz localstorage (vratim u objekt)
    return JSON.parse(localStorage.getItem("user"));
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

export { Service, Auth };
