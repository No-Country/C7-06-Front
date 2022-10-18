import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authAction";

const local = JSON.parse(localStorage.getItem("userToken"));
const userToken = local && local.token ? local.token : null;
const userLogged = local && local.id && local.role ? { id: local.id, role: local.role } : false;

const initialState = {
  loading: false,
  userLogged,
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
      state.success = false;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.success = true; // register successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.success = false;
      state.error = payload;
    },
    // login user
    [userLogin.pending]: state => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // login succefull
      state.userLogged = { id: payload.id, role: payload.role };
      state.userToken = payload.token;
      state.error = false;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.success = false;
    }
    // register user reducer...
  }
});

export default authSlice.reducer;
