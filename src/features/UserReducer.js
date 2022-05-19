import axios from "axios";
import { createSlice } from "@reduxjs/toolkit"
import { fetchReducer } from '../utils/fetchReducer';
import { baseURL } from "../utils/baseUrl";

const initialState = {
  status: 'void',
  data: null,
  error: null,
}

export function GetOrUpdateUser(first, last) {
  return async (dispatch, getState) => {
    const status = getState().user.status;
    if (status === 'pending' || status === 'updating') {
      return;
    }
    dispatch(actions.fetching());
    try {
      const headers = {
        'authorization': `Bearer ${localStorage.getItem('token')}`,
      };
      let response;
      if (first || last) {
        response = await axios.put(baseURL + 'user/profile', {
          firstName: first,
          lastName: last,
        }, { headers });
      } else {
        response = await axios.post(baseURL + 'user/profile', {}, { headers });
      }
      const data = response.data?.body;
      dispatch(actions.resolved(data));
    } catch (error) {
      dispatch(actions.rejected(error));
    }
  };
}

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    ...fetchReducer,
  },
});

export default reducer;