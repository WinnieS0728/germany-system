import { createSlice } from "@reduxjs/toolkit";
import { statusType } from "@/types/api";

export interface detailData_date {
  startDate: "";
  endDate: "";
}
export interface detailData_data {
  district: string;
  city: string;
  purpose: string;
  eventId?: string;
  cus: string;
  hotel: string;
  PS: string;
}
export interface detailDataType {
  id: number;
  date: detailData_date | string[];
  data: detailData_data[];
}
export interface detailDataWithSingleData {
  id: number;
  date: string[];
  data: detailData_data;
}

const initData: detailDataType = {
  id: 0,
  date: {
    startDate: "",
    endDate: "",
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
    addData: (state) => {
      const newItem = {
        id: state.body.length + 1,
        date: initData.date,
        data: [],
      };
      state.body.push(newItem);
    },
    setDate: (state, action) => {
      if (!action.payload || action.payload.length === 0) {
        return;
      }
      action.payload.forEach((i: detailData_date, index: number) => {
        state.body[index].date = i;
      });
    },
    pushData: (state, action) => {
      const targetItem = state.body.find((i) => i.id === state.target);

      targetItem?.data.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.body.splice(action.payload, 1);
    },
    deleteData: (state, action) => {
      const targetItem = state.body.find((i) => i.id === action.payload);
      targetItem?.data.splice(-1);
    },
    clearData: (state) => {
      state.body = data;
    },
  },
});

export default tripDetailSlice.reducer;

export const {
  setTarget,
  addData,
  pushData,
  deleteData,
  setDate,
  deleteItem,
  clearData,
} = tripDetailSlice.actions;
