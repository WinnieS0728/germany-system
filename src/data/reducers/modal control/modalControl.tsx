import { createSlice } from "@reduxjs/toolkit";

export type modalList = {
  newDetail: boolean;
  review: boolean;
  errors: boolean;
  files: boolean;
  sign: boolean;
  otherSign: boolean;
};

const initData: modalList = {
  newDetail: false,
  review: false,
  errors: false,
  files: false,
  sign: false,
  otherSign: false,
};
const modalControlSlice = createSlice({
  name: "modalControl",
  initialState: {
    body: initData,
  },
  reducers: {
    toggleModal: (state, action) => {
      state.body[action.payload.name as keyof modalList] =
        action.payload.status;
    },
  },
});

export default modalControlSlice.reducer;

export const { toggleModal } = modalControlSlice.actions;
