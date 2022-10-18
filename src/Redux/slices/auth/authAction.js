import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUserPub } from "../../../helpers/axios";

// REGISTER USER
export const registerUser = createAsyncThunk(
  "authSlice/registerUser",
  async ({ email, password, name, surname }, { rejectWithValue }) => {
    try {
      // const config = { headers: { "Content-Type": "aplication/json" } };
      // const body = { email, password, name, surname };
      await apiUserPub.post("/api/auth/signup", { email, password, name, surname });
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

// LOGIN USER

export const userLogin = createAsyncThunk(
  "authSlice/userLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await apiUserPub.post("/api/auth/login", { email, password });
      // store user's token in local storage
      localStorage.setItem("userToken", JSON.stringify(data));
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
