import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || null,
    userid: localStorage.getItem('userid') || null,
  },
  reducers: {
    setCredentials: (state, action) => {
      const { token, email, userid } = action.payload;
      state.token = token;
      state.email = email;
      state.userid = userid;
    },
    clearCredentials: (state) => {
      state.token = null;
      state.email = null;
      state.userid = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
