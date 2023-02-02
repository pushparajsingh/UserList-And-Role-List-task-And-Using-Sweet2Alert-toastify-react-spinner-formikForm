import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: [
    {
      name: "Pushparaj",
      email: "foobar@example.com",
      password: "foobardfgdfg",
      username: "raj",
      mobile: "6266466513",
      role: "Senior Developer",
      key: "fdsfsdfdsf",
    },
    {
      name: "Pushparaj singh",
      email: "pushpa@example.com",
      password: "foobardfgdfg55",
      username: "raj",
      mobile: "6266466513",
      role: "Junior Developer",
      key: "fdsfsdfder",
    },
  ],
  userUpdate: "",
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    registerUserData: (state, action) => {
      state.userData.push(action.payload);
    },
    deleteUserData: (state, action) => {
      state.userData = action.payload;
    },
    editUserData: (state, action) => {
      state.userUpdate = action.payload;
    },
    updateUserData: (state, action) => {
      state.userData = action.payload;
    },
    removeUserData: (state, action) => {
      state.userUpdate = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  registerUserData,
  deleteUserData,
  editUserData,
  updateUserData,
  removeUserData,
} = userSlice.actions;

export default userSlice.reducer;
