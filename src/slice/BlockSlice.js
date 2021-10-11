import { createSlice } from "@reduxjs/toolkit";

export const blockSlice = createSlice({
  name: "block",
  initialState: {
    value: false,
    template: null,
  },
  reducers: {
    blockUI: (state) => {
      state.value = true;
    },
    unBlockUi: (state) => {
      state.value = false;
      state.template = null;
    },
    blockUiWithMessage: (state, action) => {
      state.value = true;
      state.template = action.payload;
    },
  },
});

export const { blockUI, unBlockUi, blockUiWithMessage } = blockSlice.actions;
export default blockSlice.reducer;

export const START_IMPORT = "Importuję dane z pliku...";
export const SAVE_CHANGES = "Zapisuję zmiany...";
