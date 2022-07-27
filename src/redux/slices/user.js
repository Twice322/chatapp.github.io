import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  unreadMessages: 0,
  currentDialogId: window.location.pathname.split("dialog/")[1],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchUserData: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: {},
});
export const userReducer = userSlice.reducer;
export const { fetchUserData } = userSlice.actions;
