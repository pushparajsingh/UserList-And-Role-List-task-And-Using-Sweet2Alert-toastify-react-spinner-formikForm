import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleData: [
    { roleLabel: "Junior developer", roleKey: "4587" },
    { roleLabel: "Senior developer", roleKey: "4589" },
    { roleLabel: "Intern developer", roleKey: "4510" },
  ],
  updateRoleData: "",
};

export const roleSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    registerRoleData: (state, action) => {
      state.roleData.push(action.payload);
    },
    deleteRoleData: (state, action) => {
      state.roleData = action.payload;
    },
    editRoleData: (state, action) => {
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
  registerRoleData,
  deleteRoleData,
  editRoleData,
  updateRoleSingleData,
  removeRoleData,
} = roleSlice.actions;

export default roleSlice.reducer;
