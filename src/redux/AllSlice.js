import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [
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
  update: "",
  roleData: [
    { roleLabel: "Junior developer", roleKey: "4587" },
    { roleLabel: "Senior developer", roleKey: "4589" },
    { roleLabel: "Intern developer", roleKey: "4510" },
  ],
  updateRoleData: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    registerUserData: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUserSingleData: (state, action) => {
      state.value = action.payload;
    },
    editUserSingleData: (state, action) => {
      state.update = action.payload;
    },
    updateUserData: (state, action) => {
      state.value = action.payload;
    },
    removeUserSingleData: (state, action) => {
      state.update = "";
    },
    registerRoleData: (state, action) => {
      state.roleData.push(action.payload);
    },
    deleteRoleSingleData: (state, action) => {
      state.roleData = action.payload;
    },
    editRoleSingleData: (state, action) => {
      state.updateRoleData = action.payload;
    },
    updateRoleSingleData: (state, action) => {
      state.roleData = action.payload;
    },
    removeRoleData: (state, action) => {
      state.updateRoleData = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  registerUserData,
  deleteUserSingleData,
  editUserSingleData,
  updateUserData,
  registerRoleData,
  deleteRoleSingleData,
  editRoleSingleData,
  updateRoleSingleData,
  removeUserSingleData,
  removeRoleData,
} = counterSlice.actions;

export default counterSlice.reducer;
