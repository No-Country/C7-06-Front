import axios from "axios";

export const apiPub = axios.create({
  baseURL: "https://animatch-test.herokuapp.com",
  headers: { "Content-Type": "application/json" }
  // withCredentials: true
});

export const apiPrivate = axios.create({
  baseURL: "https://animatch-test.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true
  }
});
export const apiUser = axios.create({
  baseURL: "https://c7-06-authentication.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true
  }
});

export const apiAuth = axios.create({
  baseURL: "https://c7-06-authentication.up.railway.app",
  header: { "Content-Type": "application/json" }
});
