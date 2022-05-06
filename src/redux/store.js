import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducers/LoginReducer";
import userReducer from "../reducers/UserReducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});
