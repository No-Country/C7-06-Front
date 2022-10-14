import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUser } from "../../../helpers/axios";

// GET USER LOGGED
export const getUserLogged = createAsyncThunk(
  "userSlice.getUserById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "aplication/json" } };
      const response = await apiUser.get(`/api/users/${id}`, config);
      const userData = {
        id: response.data.user.id,
        address: response.data.user.address,
        name: response.data.user.name,
        surname: response.data.user.surname,
        description: response.data.user.description,
        email: response.data.user.email,
        phone_number: response.data.user.phone_number,
        role: response.data.user.role
      };
      return userData;
    } catch (error) {
      console.log("error: ", error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
