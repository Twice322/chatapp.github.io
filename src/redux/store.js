import { configureStore } from "@reduxjs/toolkit";
import { dialogsReducer } from "./slices/dialogs";
import { userReducer } from "./slices/user";
import { messagesReducer } from "./slices/messages";
export const store = configureStore({
  reducer: {
    dialogs: dialogsReducer,
    user: userReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
