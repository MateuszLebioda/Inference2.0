import { createSlice } from "@reduxjs/toolkit";
import IdService from "../services/IdService";
import FileService from "../model/file/FileService";

const fileService = new FileService();

export const fileSlice = createSlice({
  name: "files",
  initialState: {
    values: [],
  },
  reducers: {
    addNewFile: (state) => {
      const newFile = fileService.createEmptyFile(
        IdService.getId(state.values)
      );
      state.values = state.values.concat(newFile);
    },
  },
});

export const { addNewFile } = fileSlice.actions;
export default fileSlice.reducer;
