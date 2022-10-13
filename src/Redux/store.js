import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/auth";

export default configureStore({
  reducer: {
    users
  }
});
