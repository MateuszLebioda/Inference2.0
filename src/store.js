import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./slice/FileSlice";
import blockSlice from "./slice/BlockSlice";
import historySlice from "./slice/HistorySlice";

const store = configureStore({
  reducer: {
    file: fileSlice,
    block: blockSlice,
    history: historySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
