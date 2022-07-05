/** @format */

import { createSlice } from "@reduxjs/toolkit";

/** @format */
const initialState = {
  users: [],
  user: null,
  loading: false,
};
const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    register: (state, action) => {
      localStorage.setItem("register", JSON.stringify([action.payload]));
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    },
    login: (state, action) => {
      localStorage.setItem("login", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
      };
    },
    logout: (state, action) => {
      localStorage.removeItem("register");
      localStorage.removeItem("login");
      return { user: null, users: [] };
    },
  },
});
export const { register, login, logout } = authSlice.actions;

export default authSlice.reducer;
