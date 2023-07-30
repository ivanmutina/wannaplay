// za kontakt sa serverom
import axios from "axios";
const url = "http://localhost:3000/api/post";

export default class API {
  // uhvati sve postove sa servera
  static async getAllPost() {
    const res = await axios.get(url);
    return res.data;
  }
  // uhvati jedan post uz ID
  static async getPostByID(id) {
    const res = await axios.get(`${url}/${id}`);
    return res.data;
  }
  // ubaci post u bazu podataka
  static async addPost(post) {
    const res = await axios.post(url, post);
    return res.data;
  }
  // ažuriraj post u bazi podataka
  static async updatePost(id, post) {
    const res = await axios.patch(`${url}/${id}`, post);
    return res.data;
  }
  // obriši post
  static async deletePost(id) {
    const res = await axios.delete(`${url}/${id}`);
    return res.data;
  }
  // Dodajemo novu metodu za ažuriranje broja "places left" na serveru
  static async updatePlacesLeft(id, placesLeft) {
    const res = await axios.patch(`${url}/${id}`, { players: placesLeft });
    return res.data;
  }
}
