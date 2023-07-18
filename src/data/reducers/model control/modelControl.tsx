import { createSlice } from "@reduxjs/toolkit";

const modelControlSlice = createSlice({
  name: "modelControl",
  initialState: {
    isOpen: false,
  },
  reducers: {
    toggleModel: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export default modelControlSlice.reducer;

export const { toggleModel } = modelControlSlice.actions;
