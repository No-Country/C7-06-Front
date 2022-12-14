import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Filter from "./components/Filter";
import {
  Home,
  Login,
  Register,
  PetProfile,
  Layout,
  UserProfile,
  ContactUs,
  UserAccount,
  NotFound,
  AboutUs
} from "./pages";
import ProtectedRoute from "./routing/protectedRoute";

import reportWebVitals from "./reportWebVitals";
import store from "./Redux/store"; // Configuracion redux toolkit
import { Provider } from "react-redux"; // Configuracion redux toolkit
import PetFormPage from "./pages/PetFormPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { index: true, path: "/", element: <Home /> },
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
        element: <AboutUs />
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
        path: "/user/:id",
        element: <UserProfile />
      },
      {
        path: "/contact",
        element: <ContactUs />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/account",
            element: <UserAccount />
          },
          { path: "/add-pet", element: <PetFormPage /> },
          { path: "/add-pet/:id", element: <PetFormPage /> }
        ]
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
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
