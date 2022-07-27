import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onSnapshot, collection, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const fetchDialogs = createAsyncThunk(
  "dialogs/fetchDialogs",
  async (id, { dispatch }) =>
    await new Promise((resolve, _) => {
      onSnapshot(query(collection(db, "dialogs")), async (snapshot) => {
        const dialogsArray = [];

        snapshot.docs.forEach((dialog) => {
          if (Object.keys(dialog.data()).length !== 0) {
            const authorId = dialog.data().conversation.author.id;

            const partnerId = dialog.data().conversation.partner.id;

            const myDialog = authorId === id || partnerId === id;

            myDialog && dialogsArray.push(dialog.data());
          }
        });
        dispatch(dialogsSlice.actions.setDialogs(dialogsArray));
      });
    })
);

const initialState = {
  items: [],
  unreadMessages: 0,
  currentDialogId: window.location.pathname.split("dialog/")[1],
  isLoading: true,
};

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setCurrentDialogId: (state, { payload }) => {
      state.currentDialogId = payload;
    },
    setDialogs: (state, { payload }) => {
      state.items = payload;
      state.status = "loaded";
    },
  },
  extraReducers: {
    [fetchDialogs.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchDialogs.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "loaded";
    },
    [fetchDialogs.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const dialogsReducer = dialogsSlice.reducer;
export const { setCurrentDialogId } = dialogsSlice.actions;
