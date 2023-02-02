import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice/UserSlice";
import RoleSlice from "./Slice/RoleSlice";

export const store = configureStore({
  reducer: {
    users: UserSlice,
    roles: RoleSlice,
  },
});
