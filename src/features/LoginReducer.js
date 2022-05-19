import { createSlice } from "@reduxjs/toolkit"
import fetcher, { fetchReducers } from '../utils/Api';

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

export function logIn(formData) {
  return async (dispatch, getState) => {
    const status = getState().login.status;
    if (status === 'pending' || status === 'updating') {
      return;
    }
    dispatch(actions.fetching());
    try {
      const response = await fetcher.post('/user/login', formData);
      const data = response.data.body;
      localStorage.setItem('token', data.token);
      dispatch(actions.resolved(data));
    } catch (error) {
      dispatch(actions.rejected(error));
    }
  };
}

const { actions, reducer } = createSlice({
  name: 'login',
  initialState,
  reducers: {
    fetchReducers,
    setToken: (state, action) => {
      state.data = action.payload;
      return state;
    },

    removeToken: () => {
      localStorage.removeItem('token');
      return initialState;
    },
  }
})

export const {setToken, removeToken } = actions;
export default reducer;

