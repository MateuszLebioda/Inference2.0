import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    value: "Attributes",
  },
  reducers: {
    changeHistory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { changeHistory } = historySlice.actions;
export default historySlice.reducer;
