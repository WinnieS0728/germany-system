import { createSlice } from "@reduxjs/toolkit";

interface dataType {
  [key: string]: { isOpen: boolean };
}
const initData: dataType = {
  newDetail: {
    isOpen: false,
  },
  review: {
    isOpen: false,
  },
};
const modelControlSlice = createSlice({
  name: "modelControl",
  initialState: initData,
  reducers: {
    toggleModel: (state, action) => {
      state[action.payload.name].isOpen = action.payload.status;
    },
  },
});

export default modelControlSlice.reducer;

export const { toggleModel } = modelControlSlice.actions;
