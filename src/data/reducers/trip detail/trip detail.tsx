import { createSlice } from "@reduxjs/toolkit";
import { statusType } from "@/types/api";

interface detailData_date {
  startDate: "";
  endDate: "";
}
interface detailDataType {
  id: number;
  date: detailData_date;
  data: {
    district: string;
    city: string;
    purpose: string;
    cus: string;
    hotel: string;
    PS: string;
  }[];
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
      action.payload.forEach((i:detailData_date, index:number) => {
        state.body[index].date = i;
      });
    },
    pushData: (state, action) => {
      const targetItem = state.body.find((i) => i.id === state.target);

      targetItem?.data.push(action.payload);
    },
    deleteData: (state, action) => {
      const targetItem = state.body.find((i) => i.id === action.payload);
      targetItem?.data.splice(-1);
    },
  },
});

export default tripDetailSlice.reducer;

export const { setTarget, addData, pushData, deleteData, setDate } =
  tripDetailSlice.actions;
