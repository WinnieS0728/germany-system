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
  errors: {
    isOpen: false,
  },
  files: {
    isOpen: false,
  },
};
const modalControlSlice = createSlice({
  name: "modalControl",
  initialState: initData,
  reducers: {
    toggleModal: (state, action) => {
      state[action.payload.name].isOpen = action.payload.status;
    },
  },
});

export default modalControlSlice.reducer;

export const { toggleModal } = modalControlSlice.actions;
