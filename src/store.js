import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./slice/FileSlice";
import blockSlice from "./slice/BlockSlice";

const store = configureStore({
  reducer: {
    file: fileSlice,
    block: blockSlice,
  },
});

export default store;
