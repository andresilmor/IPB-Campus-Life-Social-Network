import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: undefined,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.user.user_id = action.payload.email_address.split("@")[0]
    }, 
    updateUser: (state, action) => {
      state.user.first_name = action.payload.first_name;
      state.user.last_name = action.payload.last_name;
      state.user.email_address = action.payload.email_address;
      state.user.birthdate = action.payload.birthdate;
      state.user.degree = action.payload.degree;
      state.user.profile_image = action.payload.profile_image;
      state.user.nationality = action.payload.nationality;
      state.user.school = action.payload.school;
      state.user.organization = action.payload.organizatio;
    },
    cleanUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, updateUser, cleanUser } = userSlice.actions;

export default userSlice.reducer;
