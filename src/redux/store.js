import { configureStore } from "@reduxjs/toolkit";
import { dialogsReducer } from "./slices/dialogs";
import { messagesReducer } from "./slices/messages";

export const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
