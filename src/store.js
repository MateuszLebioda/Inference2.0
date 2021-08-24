import { configureStore } from "@reduxjs/toolkit";
import fileSlice from "./slice/FileSlice";
import blockSlice from "./slice/BlockSlice";

export default configureStore({
  reducer: {
    files: fileSlice,
    block: blockSlice,
  },
});
