import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUser } from "../../../helpers/axios";

// REGISTER USER
export const registerUser = createAsyncThunk(
  "authSlice/registerUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "aplication/json" } };
      await apiUser.post("/api/auth/signup", { email, password }, config);
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
      // configure header's Content-Type as JSON
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const { data } = await apiUser.post("/api/auth/login", { email, password }, config);
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
