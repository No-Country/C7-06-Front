import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUserAuth, apiPub, apiPrivate } from "../../../helpers/axios";

// GET USER LOGGED
export const getUserLogged = createAsyncThunk(
  "userSlice.getUserById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await apiPrivate.get(`/userProfile`);
      const userData = {
        id: response.data.id,
        name: response.data.name,
        surname: response.data.surname,
        email: response.data.email,
        address: response.data.address,
        description: response.data.description,
        phoneNumber: response.data.phoneNumber,
        pictureResponse: response.data.pictureResponse
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

// Modify User Logged Data
export const modifyUserInfo = createAsyncThunk(
  "userSlice.modifyUserInfo",
  async ({ userId, userObject }, { rejectWithValue }) => {
    try {
      const response = await apiUserAuth.put(`/api/users/${userId}/update`, userObject);

      let pictureLoad;
      console.log("fileuseraction:", userObject.file);
      if (userObject.file) {
        const data = new FormData();
        data.append("file", userObject.file);
        console.log(" data ", data);
        if (userObject.avatar.id) {
          pictureLoad = await apiPrivate.put(`/pictures/${userObject.avatar.id}`, data);
          response.data.user.pictureResponse = pictureLoad.data;
        } else {
          pictureLoad = await apiPrivate.post(`/avatar`, data);
          response.data.user.pictureResponse = pictureLoad.data;
        }
      }
      return response.data.user;
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

// Delete User
export const deleteUser = createAsyncThunk(
  "userSlice.deleteUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await apiUserAuth.delete(`/api/users/${id}/delete`);
      return response.data;
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

// Change Password User
export const ChangePasswordUser = createAsyncThunk(
  "userSlice.deleteUser",
  async (objeto, { rejectWithValue }) => {
    try {
      // agregar llamada
      // return response.data;
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
