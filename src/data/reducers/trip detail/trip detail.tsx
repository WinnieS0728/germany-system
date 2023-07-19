import { createSlice } from "@reduxjs/toolkit";
import { statusType } from "@/types/api";

export interface detailDataType {
  id: number;
  date: {
    start: "";
    end: "";
  };
  data: {
    district: string;
    city: string;
    purpose: string;
    cus: string;
    hotel: string;
    PS: string;
  }[];
}

export const initData: detailDataType = {
  id: 0,
  date: {
    start: "",
    end: "",
  },
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
          date: initData.date,
          data: [action.payload],
        };
        state.body.push(newItem);
      } else {
        targetItem?.data.push(action.payload);
      }
    },
    deleteData: (state, action) => {
      const targetItem = state.body.find((i) => i.id === action.payload);
      targetItem?.data.splice(-1);
    },
  },
});

export default tripDetailSlice.reducer;

export const { setTarget, addData, deleteData } = tripDetailSlice.actions;
