import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUserAuth, apiPub, apiPrivate } from "../../../helpers/axios";

// GET USER LOGGED
export const getUserLogged = createAsyncThunk(
  "userSlice.getUserById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await apiUserAuth.get(`/api/users/${id}`);
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

// Modify User Logged Data
export const modifyUserInfo = createAsyncThunk(
  "userSlice.modifyUserInfo",
  async ({ userId, userObject }, { rejectWithValue }) => {
    try {
      // apiUserAuth.defaults.headers.common.Authorization = `Bearer ${
      //   localStorage.getItem("userToken").token
      // }`; // esto no hace falta y da error porque ya esta puesto ese header en el helper axios
      const response = await apiUserAuth.put(`/api/users/${userId}/update`, userObject);

      let pictureLoad;
      console.log("fileuseraction:", userObject.file);
      if (userObject.file) {
        const data = new FormData();
        data.append("file", userObject.file);
        console.log(" data ", data);
        if (userObject.avatar.id) {
          pictureLoad = await apiPrivate.put(`/pictures/${userObject.avatar.id}`, { data: data });
          response.data.avatar = pictureLoad.data;
          console.log(pictureLoad);
        } else {
          pictureLoad = await apiPrivate.post(`/avatar`, { data: data });
          response.data.avatar = pictureLoad.data;
          console.log(pictureLoad);
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
