import { createSlice } from "@reduxjs/toolkit";
import { getUserLogged } from "./userAction";

const initialState = {
  loading: false,
  userInfo: false,
  error: null,
  success: false
};

const userSlice = createSlice({
  name: "userSlice", // nombre del slice
  initialState, // como cuando hacemos const [name, setname] = useState(initialState)
  reducers: {}, // dentro de reducers creamos las funciones para actualizar el estado.
  extraReducers: {
    // register user
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
    }
  }
});

export default userSlice.reducer;
