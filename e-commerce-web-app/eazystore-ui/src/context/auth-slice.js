import { createSlice } from "@reduxjs/toolkit";

const jwtToken = localStorage.getItem("jwtToken");
const user = localStorage.getItem("user");

const initialAuthState = {
  jwtToken: jwtToken || null,
  user: user ? JSON.parse(user) : null,
  isAuthenticated: !!(jwtToken && user),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    loginSuccess(state, action) {
      const { jwtToken, user } = action.payload;
      state.jwtToken = jwtToken;
      state.user = user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.jwtToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectJwtToken = (state) => state.auth.jwtToken;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;