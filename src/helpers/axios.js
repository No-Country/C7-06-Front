import axios from "axios";

const BASE_URL = "https://animatch-test.herokuapp.com";

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" }
  // withCredentials: true
});
