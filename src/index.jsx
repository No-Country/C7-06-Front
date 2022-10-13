import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Filter from "./components/Filter";
import { Home, Login, Register, PetProfile, UserProfile, UserAccount } from "./pages";

import reportWebVitals from "./reportWebVitals";
import store from "./Redux/store"; // Configuracion redux toolkit
import { Provider } from "react-redux"; // Configuracion redux toolkit
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
    element: <Filter />
  },
  {
    path: "/pet/:id",
    element: <PetProfile />
  },
  {
    path: "/user",
    element: <UserProfile />
  },
  {
    path: "/account",
    element: <UserAccount />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
