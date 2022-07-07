/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 0,
  pageLimit: 5,
};
export const delUser = createAsyncThunk("user/delUser", async ({ id }) => {
  console.log(id);
  const result = axios
    .delete(`http://localhost:5000/users/${id}`)
    .then((res) => res.data);
  return result;
});

export const loadUsers = createAsyncThunk(
  "user/createUser",
  async ({ start, end, currentPage }) => {
    const result = axios
      .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
      .then((res) => {
        console.log(res, "c");
        return { res: res.data, currentPage };
      });
    return result;
  }
);
export const sortUsers = createAsyncThunk("user/createUser", async (val) => {
  const result = axios
    .get(`http://localhost:5000/users?_sort=${val}&_order=asc`)
    .then((res) => {
      return {
        res: res.data.sort((a, b) =>
          a.data > b.data ? 1 : b.data > a.data ? -1 : 0
        ),
      };
    });
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
export const updateUser = createAsyncThunk(
  "create/updateUser",
  async ({ id, formVal }) => {
    console.log(formVal);
    const result = axios
      .put(`http://localhost:5000/users/${id}`, formVal)
      .then((res) => res);
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
    [loadUsers.fulfilled]: setTimeout(() => {
      return (state, action) => {
        state.loading = false;
        state.users = action.payload.res.res;
        state.currentPage = state.currentPage + action.payload.currentPage;
      };
    }, 5000),
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

    [sortUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [sortUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [sortUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { addUser } = crudSlice.actions;
export default crudSlice.reducer;
