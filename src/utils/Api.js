import axios from "axios";

export default axios.create({
  baseURL: 'http://localhost:3001/api/v1/',
});

export const fetchReducers = {
  fetching: (draft) => {
    if (draft.status === 'void') {
      draft.status = 'pending';
      return;
    }
    if (draft.status === 'rejected') {
      draft.error = null;
      draft.status = 'pending';
      return;
    }
    if (draft.status === 'resolved') {
      draft.status = 'updating';
      return;
    }
    return;
  },
  resolved: (draft, action) => {
    if (draft.status === 'pending' || draft.status === 'updating') {
      draft.data = action.payload;
      draft.status = 'resolved';
      return;
    }
    return;
  },
  rejected: (draft, action) => {
    if (draft.status === 'pending' || draft.status === 'updating') {
      draft.status = 'rejected';
      draft.error = JSON.stringify(action.payload);
      draft.data = null;
      return;
    }
    return;
  },
};
