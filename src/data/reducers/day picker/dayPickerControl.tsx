import { createSlice } from "@reduxjs/toolkit";
import { statusType } from "@/types/api";

interface initDataType {
  disabled: { from: Date; to: Date }[];
}
const data: initDataType = {
  disabled: [],
};

const dayPickerSlice = createSlice({
  name: "dayPicker",
  initialState: {
    body: data,
    status: statusType.idle,
  },
  reducers: {
    addDisabledDays: (state, action) => {
      state.body.disabled.push(action.payload);
    },
  },
});

export default dayPickerSlice.reducer;

export const { addDisabledDays } = dayPickerSlice.actions;
