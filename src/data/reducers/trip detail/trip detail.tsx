import { createSlice } from "@reduxjs/toolkit";
import { statusType } from "@/types/api";

export interface detailDataType {
  id: number;
  data: {
    district: string;
    city: string;
    purpose: string;
    cus: string;
    hotel: string;
    PS: string;
  }[];
}

export const initData = {
  id: 0,
  data: [
    {
      district: "",
      city: "",
      purpose: "",
      cus: "",
      hotel: "",
      PS: "",
    },
  ],
};

const data: detailDataType[] = [];

const tripDetailSlice = createSlice({
  name: "tripDetail",
  initialState: {
    body: data,
    status: statusType.idle,
    target: 0,
  },
  reducers: {
    setTarget: (state, action) => {
      state.target = action.payload;
    },
    addData: (state, action) => {
      const targetItem = state.body.find((i) => i.id === state.target);

      if (!targetItem) {
        const newItem = {
          id: state.body.length + 1,
          data: [action.payload],
        };
        state.body.push(newItem);
      }else{
        targetItem?.data.push(action.payload);
      }
    },
    deleteData: (state) => {
      const targetItem = state.body.find((i) => i.id === state.target);
      targetItem?.data.splice(-1);
    },
  },
});

export default tripDetailSlice.reducer;

export const { setTarget, addData, deleteData } = tripDetailSlice.actions;
