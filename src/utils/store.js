import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/LoginReducer";
import userReducer from "../features/UserReducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});
