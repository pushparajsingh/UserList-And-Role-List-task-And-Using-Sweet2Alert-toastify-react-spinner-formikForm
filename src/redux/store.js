import { configureStore } from "@reduxjs/toolkit";
import AllData from "./AllSlice";

export const store = configureStore({
  reducer: {
    Data: AllData,
  },
});
