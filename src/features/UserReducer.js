import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
}
export const UserSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    UserProfile: (state, action) => {
      const profile = action.payload;
      state.firstName = profile.firstName;
      state.lastName = profile.lastName;
      state.email = profile.email;
    },
  }
})

export const { UserProfile } = UserSlice.actions;
export default UserSlice.reducer;