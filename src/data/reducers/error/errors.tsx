import { createSlice } from "@reduxjs/toolkit";

const initData = {};

const errorSlice = createSlice({
  name: "errors",
  initialState: { body: initData },
  reducers: {
    setErrors: (state, action) => {
      state.body = action.payload;
    },
  },
});

export default errorSlice.reducer;

export const { setErrors } = errorSlice.actions;
