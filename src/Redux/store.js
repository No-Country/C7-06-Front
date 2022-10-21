import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth";
import userSlice from "./slices/user";

// Pensemos la Store como el índice que indica qué "useStates" tendremos y dónde encontrarlos.
const store = configureStore({
  // Los reducer serían como la función que actualiza un estado. Cada función se mete en un
  // Slice que es una parte de todo el estado.
  reducer: {
    auth: authSlice,
    user: userSlice
  }
});

export default store;
