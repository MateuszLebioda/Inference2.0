import { createSlice } from "@reduxjs/toolkit";
import FileService from "../model/file/FileService";

const fileService = new FileService();

const getEmptyFile = () => {
  const newFile = fileService.createEmptyFile(1);
  newFile.name = "default";
  return newFile;
};

export const fileSlice = createSlice({
  name: "files",
  initialState: {
    value: getEmptyFile(),
  },
  reducers: {
    updateElement: (state, action) => {
      const newFile = { ...state.value };
      newFile.attributes = action.payload.attributes;
      newFile.rules = action.payload.rules;
      newFile.facts = action.payload.facts;
      state.value = newFile;
    },

    removeAttribute: (state, action) => {
      state.value.attributes = state.value.attributes.filter(
        (a) => a.id !== action.payload.id
      );
    },
  },
});

export const { updateElement, removeAttribute } = fileSlice.actions;
export default fileSlice.reducer;
