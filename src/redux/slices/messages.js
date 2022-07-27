import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import {
  createMessageInDialog,
  updateCurrentDialogLastMessage,
} from "../../api";
import { db } from "../../firebase/firebase";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (id, { dispatch }) => {
    return await new Promise((resolve, _) => {
      onSnapshot(
        query(
          collection(db, "messages"),
          where("dialog", "==", id),
          orderBy("created_at", "desc")
        ),
        (snapshot) => {
          const array = [];
          snapshot.docs.forEach((item) => array.push(item.data()));
          dispatch(messagesSlice.actions.setMessages(array));
        }
      );
    });
  }
);
export const fetchSendMessage = createAsyncThunk(
  "messages/fetchSendMessage",
  async ({ authorId, text, dialogId, attachments }) => {
    const lastMessage = await createMessageInDialog(
      authorId,
      dialogId,
      text,
      attachments
    );
    updateCurrentDialogLastMessage(dialogId, lastMessage);
  }
);

const initialState = {
  items: [],
};

const messagesSlice = createSlice({
  name: " messages",
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.items = payload;
      state.status = "loaded";
    },
  },
  extraReducers: {
    [fetchMessages.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchMessages.fulfilled]: (state, { payload }) => {
      state.status = "loaded";
      state.items = payload;
    },
    [fetchMessages.rejected]: (state) => {
      state.items = [];
      state.status = "error";
    },
  },
});
export const messagesReducer = messagesSlice.reducer;
