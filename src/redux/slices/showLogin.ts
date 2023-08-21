import { createSlice } from "@reduxjs/toolkit";

export interface showLoginState {
  value: boolean;
}

const initialState: showLoginState = {
  value: false,
};

export const showLoginSlice = createSlice({
  name: "showLogin",
  initialState,
  reducers: {
    showLoginDialog: (state) => {
      state.value = true;
    },
    hideLoginDialog: (state) => {
      state.value = false;
    },
  },
});

export const { hideLoginDialog, showLoginDialog } = showLoginSlice.actions;

export default showLoginSlice.reducer;
