import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Filter from "./components/Filter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
// import UserProfile from "./pages/UserProfile";

import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/about",
    element: <Login />
  },
  {
    path: "/search",
    element: <Login />
  },
  {
    path: "/buscar",
    element: <Filter />
  }
  //,
  // {
  //   path: "/user",
  //   element: <UserProfile />
  // }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
