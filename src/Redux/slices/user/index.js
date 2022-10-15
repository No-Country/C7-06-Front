import { createSlice } from "@reduxjs/toolkit";
import { getUserLogged, getUserLoggedPets, getUserLoggedFavPets } from "./userAction";

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
      state.error = null;
    },
    [getUserLogged.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.userInfo = payload;
    },
    [getUserLogged.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get pets of user logged
    [getUserLoggedPets.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [getUserLoggedPets.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.myPets = payload;
    },
    [getUserLoggedPets.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
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
    }
  }
});

export default userSlice.reducer;
