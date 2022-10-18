import axios from "axios";

const token = () => {
  const local = JSON.parse(localStorage.getItem("userToken"));
  const token = local && local.token ? local.token : null;
  return token;
};

export const apiPrivate = axios.create({
  baseURL: "http://animatchapp.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    withCredentials: true
  }
});

export const apiPub = axios.create({
  baseURL: "http://animatchapp.herokuapp.com",
  headers: {
    "Content-Type": "application/json"
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
  baseURL: "https://c7-06-authentication.up.railway.app",
  // baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token()}`,
    withCredentials: true
  }
});
