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
    addMetrics: (state, action) => {
      const newFile = { ...state.value };
      newFile.metrics = [...state.value.metrics, action.payload.metrics];
      state.value = newFile;
    },

    removeMetrics: (state, action) => {
      const newFile = { ...state.value };
      newFile.metrics = [...state.value.metrics].filter(
        (m) => m.id !== action.payload
      );
      state.value = newFile;
    },

    updateElement: (state, action) => {
      const newFile = { ...state.value };
      newFile.attributes = action.payload.attributes;
      newFile.rules = action.payload.rules;
      newFile.facts = action.payload.facts;
      action.payload.metrics && (newFile.metrics = action.payload.metrics);
      action.payload.name && (newFile.name = action.payload.name);
      state.value = newFile;
    },

    removeAttribute: (state, action) => {
      state.value.attributes = state.value.attributes.filter(
        (a) => a.id !== action.payload.id
      );
    },
  },
});

export const { updateElement, removeAttribute, removeMetrics, addMetrics } =
  fileSlice.actions;
export default fileSlice.reducer;
