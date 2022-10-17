import axios from "axios";

const local = JSON.parse(localStorage.getItem("userToken"));
const token = local && local.token ? local.token : null;

export const apiPrivate = axios.create({
  baseURL: "https://animatchapp.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    withCredentials: true
  }
});

export const apiPub = axios.create({
  baseURL: "https://animatchapp.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    withCredentials: true
  }
});
export const apiUserPub = axios.create({
  baseURL: "https://c7-06-authentication.up.railway.app",
  // baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json"
  }
});

export const apiUserAuth = axios.create({
  // baseURL: "https://c7-06-authentication.up.railway.app",
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    withCredentials: true
  }
});
