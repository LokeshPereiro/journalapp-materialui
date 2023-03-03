import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated", // 'checking', 'not-authenticated', 'authenticated
    uid: null,
    email: null,
    displayName: null,
    photoUrl: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, action) => {
      state.logged = true;
    },
    logout: (state, payload) => {
      state.logged = true;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});
export const { login, logout, checkingCredentials } = authSlice.actions;
