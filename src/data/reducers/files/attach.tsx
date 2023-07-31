import { createSlice } from "@reduxjs/toolkit";

const initData: File[] = [];

const fileSlice = createSlice({
  name: "files",
  initialState: { body: initData },
  reducers: {
    addFile: (state, action) => {
      const array = [...state.body];
      array.push(action.payload);
      state.body = array;
    },
  },
});

export default fileSlice.reducer;

export const { addFile } = fileSlice.actions;
