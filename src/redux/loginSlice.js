import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for user login
export const getUser = createAsyncThunk("getUser", async (loginData) => {
  console.log(loginData);
  const response = await axios.post(
    "https://academix.runasp.net/api/Auth/Login",
    loginData
  );
  const user = response.data.userdata;
  const role = response.data.result.Roles;
  const token = response.data.result.Token;
  console.log(response.data);

  return { user: user[0], role: role[0], token: token };
});

// Async thunk for user Sign Up
export const userSignup = createAsyncThunk("userSignUp", async (signupData) => {
  console.log(signupData);
  const response = await axios.post(
    "https://academix.runasp.net/api/Auth/Register",
    signupData
  );
});

// Create the login slice
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    role: "",
    isLoading: false,
    newAccMsg: false,
    signFailMsg: false,
  },
  reducers: {
    closeNewAcc: (state) => {
      state.newAccMsg = false;
    },
    closeSignfail: (state) => {
      state.signFailMsg = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.role = action.payload.role;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("role", JSON.stringify(action.payload.role));
        localStorage.setItem("token", JSON.stringify(action.payload.token));
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(userSignup.fulfilled, (state) => {
        state.newAccMsg = true;
      })
      .addCase(userSignup.rejected, (state) => {
        state.signFailMsg = true;
      });
  },
});

export const { closeNewAcc, closeSignfail } = loginSlice.actions;

export default loginSlice.reducer;
