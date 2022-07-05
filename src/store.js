/** @format */
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import crudSlice from "./crud/crudSlice";

export default configureStore({
  reducer: {
    user: authSlice,
    crud: crudSlice,
  },
});
