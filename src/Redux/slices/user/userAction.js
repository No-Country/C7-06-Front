import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUserAuth, apiPub } from "../../../helpers/axios";

// GET USER LOGGED
export const getUserLogged = createAsyncThunk(
  "userSlice.getUserById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const config = { headers: { "Content-Type": "aplication/json" } };
      const response = await apiUserAuth.get(`/api/users/${id}`, config);
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

// GET USER PETS
export const getUserLoggedPets = createAsyncThunk(
  "userSlice.getUserLoggedPets",
  async ({ id, pages }, { rejectWithValue }) => {
    try {
      const response = await apiPub.get(`/users/${id}/pets`);
      const usersPetsData = {
        id: response.data.user.petId,
        pictureResponse: response.data.pictureResponse,
        name: response.data.name,
        age: response.data.age,
        gender: response.data.gender,
        race: response.data.race
      };
      return usersPetsData;
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

// GET USER FAVORITES PETS
export const getUserLoggedFavPets = createAsyncThunk(
  "userSlice.getUserLoggedFavPets",
  async ({ userId, pages = 0 }, { rejectWithValue }) => {
    try {
      const response = await apiPub.get(`/users/${userId}/favourites?pages=${pages}`);
      const usersFavPetsData = {
        id: response.data.user.petId,
        pictureResponse: response.data.pictureResponse,
        name: response.data.name,
        age: response.data.age,
        gender: response.data.gender,
        race: response.data.race
      };
      return usersFavPetsData;
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
