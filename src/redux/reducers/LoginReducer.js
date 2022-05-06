import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLogged: false,
  token: "",
  error: "",
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.isLogged = true;
      state.token = action.payload;
      state.error = "";
    },
    userLoginError: (state, action) => {
      state.isLogged = false;
      state.token = "";
      state.error = action.payload;
    },
    userLogout: (state, action) => {
      state.isLogged = false;
      state.token = "";
      state.error = "";
    }
  }
})

export const { userLogin, userLoginError, userLogout } = loginSlice.actions;
export default loginSlice.reducer;

