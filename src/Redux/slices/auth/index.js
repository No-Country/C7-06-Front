import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authAction";

const local = JSON.parse(localStorage.getItem("userToken"));
const userToken = local && local.token ? local.token : null;
const userInfo = local && local.id && local.role ? { id: local.id, role: local.role } : false;

const initialState = {
  loading: false,
  userInfo,
  userToken,
  error: null,
  success: false
};

const authSlice = createSlice({
  name: "authSlice", // nombre del slice
  initialState, // como cuando hacemos const [name, setname] = useState(initialState)
  reducers: {}, // dentro de reducers creamos las funciones para actualizar el estado.
  extraReducers: {
    // register user
    [registerUser.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // register successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // login user
    [userLogin.pending]: state => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // login succefull
      state.userInfo = { id: payload.id, role: payload.role };
      state.userToken = payload.token;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    }
    // register user reducer...
  }
});

export default authSlice.reducer;
