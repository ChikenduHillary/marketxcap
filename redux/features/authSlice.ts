import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface AuthState {
  signInUser: any;
}

// Define initial state
const initialState: AuthState = {
  signInUser: null,
};

// Create a slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignInUser: (state, action: PayloadAction<any>) => {
      state.signInUser = action.payload;
    },
    signOut: (state, action: PayloadAction<any>) => {
      state.signInUser = null;
    },
  },
});

// Export actions and reducer
export const selectAuth = (state: RootState) => state.auth;
export const { setSignInUser, signOut } = authSlice.actions;
export default authSlice.reducer;
