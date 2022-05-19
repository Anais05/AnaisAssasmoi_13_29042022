import axios from "axios";
import { createSlice } from "@reduxjs/toolkit"
import { fetchReducer } from '../utils/fetchReducer';
import { baseURL } from "../utils/baseUrl";

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

export function logIn(email, password, remember) {
  return async (dispatch, getState) => {
    const status = getState().login.status;
    if (status === 'pending' || status === 'updating') {
      return;
    }
    dispatch(actions.fetching());
    try {
      const response = await axios.post(baseURL + 'user/login', {
        email: email,
        password: password,
      })
      const data = response.data?.body;
      if (remember) {
        localStorage.setItem('token', data.token)
        console.log(window.localStorage.getItem('token'))
      }
      dispatch(actions.resolved(data));
    } catch(error) {
      dispatch(actions.rejected(error));
    }
  };
}

export function logOut() {
  return async (dispatch) => {
    dispatch(actions.logout());
  }
}

export function setToken(token) {
  return async (dispatch) => {
    dispatch(actions.setToken(token));
  }
}

const { actions, reducer } = createSlice({
  name: 'login',
  initialState,
  reducers: {
    ...fetchReducer,

    setToken: (state, action) => {
      state.data = action.payload;
      return state;
    },

    logout: () => {
      return initialState;
    },
  }
})

export default reducer;

