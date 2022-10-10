import axios from "axios";

export default axios.create({
  baseURL: "https://animatch-test.herokuapp.com",
  headers: { "Content-Type": "application/json" }
  // withCredentials: true
});
