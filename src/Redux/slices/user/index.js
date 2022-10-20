import { createSlice } from "@reduxjs/toolkit";
import {
  getUserLogged,
  getUserLoggedPets,
  getUserLoggedFavPets,
  modifyUserInfo,
  deleteUser,
  ChangePasswordUser
} from "./userAction";

const initialState = {
  loading: false,
  userInfo: false,
  error: null,
  success: false,
  favouritesPets: false,
  myPets: false
};

const userSlice = createSlice({
  name: "userSlice", // nombre del slice
  initialState, // como cuando hacemos const [name, setname] = useState(initialState)
  reducers: {}, // dentro de reducers creamos las funciones para actualizar el estado.
  extraReducers: {
    // get user logged info
    [getUserLogged.pending]: state => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [getUserLogged.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userInfo = payload;
    },
    [getUserLogged.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },

    // get pets of user logged
    [getUserLoggedPets.pending]: state => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [getUserLoggedPets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.myPets = payload;
    },
    [getUserLoggedPets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },

    // get favourites pets of user logged
    [getUserLoggedFavPets.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getUserLoggedFavPets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.favouritesPets = payload;
    },
    [getUserLoggedFavPets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Modify User
    [modifyUserInfo.pending]: state => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [modifyUserInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = { ...state.userInfo, ...payload };
      state.error = null;
    },
    [modifyUserInfo.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    // Delete User
    [deleteUser.pending]: state => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [deleteUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = false;
      state.error = null;
    },
    [deleteUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    },
    // Change password User
    [ChangePasswordUser.pending]: state => {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    [ChangePasswordUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [ChangePasswordUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    }
  }
});

export default userSlice.reducer;
