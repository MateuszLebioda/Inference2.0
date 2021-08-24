import { configureStore } from "@reduxjs/toolkit";
import { fileSlice } from "./slice/FileSlice";

export default configureStore({
  reducer: {
    files: fileSlice,
  },
});
