import { createSlice } from "@reduxjs/toolkit";
import apiUser from "../../../Redux/slices/auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: []
  },
  reducers: {
    setAuth: (state, action) => {
      state.list = action.payload; // falta la llamada al back para llenar el estado
    }
  }
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;

// Api Functions
export const getUserLogin = dispatch => () => {
  apiUser
    .get("/")
    .then(response => dispatch(setAuth(response.data)))
    .catch(err => console.log(err));
};
