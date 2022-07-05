/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  users: [],
  loading: false,
  error: null,
};
export const delUser = createAsyncThunk("user/delUser", async ({ id }) => {
  console.log(id);
  const result = axios
    .delete(`http://localhost:5000/users/${id}`)
    .then((res) => res.data);
  return result;
});
export const loadUsers = createAsyncThunk("user/createUser", async () => {
  const result = axios
    .get(`http://localhost:5000/users`)
    .then((res) => res.data);
  console.log(result, "red");
  return result;
});
export const createUser = createAsyncThunk(
  "create/createUser",
  async ({ formVal }) => {
    const result = axios
      .post(`http://localhost:5000/users`, formVal)
      .then((res) => res);
    console.log(result);
  }
);
const crudSlice = createSlice({
  name: "crud",
  initialState: initialState,
  reducers: {
    // addUser: (state, action) => {
    //   state.users.push(action.payload);
    // },
    // updateUser: () => {},
    // delUser: () => {},
  },
  extraReducers: {
    [loadUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [loadUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [loadUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [delUser.pending]: (state, action) => {
      state.loading = true;
    },
    [delUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [delUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createUser.pending]: (state, action) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addUser } = crudSlice.actions;
export default crudSlice.reducer;
