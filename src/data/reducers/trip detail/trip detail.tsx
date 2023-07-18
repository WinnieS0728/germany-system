import { createSlice } from "@reduxjs/toolkit";
import { statusType } from "@/types/api";

export interface detailDataType {
  startDate: string;
  endDate: string;
}
export interface detailDataType {
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
  startDate: "",
  endDate: "",
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

const data: detailDataType[] = [
  {
    startDate: "",
    endDate: "",
    data: [
      {
        district: "123",
        city: "",
        purpose: "123",
        cus: "",
        hotel: "123",
        PS: "",
      },
      {
        district: "",
        city: "123",
        purpose: "123",
        cus: "123",
        hotel: "123",
        PS: "",
      },
    ],
  },
  {
    startDate: "",
    endDate: "",
    data: [
      {
        district: "456",
        city: "",
        purpose: "456",
        cus: "",
        hotel: "456",
        PS: "",
      },
      {
        district: "",
        city: "456",
        purpose: "456",
        cus: "456",
        hotel: "456",
        PS: "",
      },
    ],
  },
];

const tripDetailSlice = createSlice({
  name: "tripDetail",
  initialState: {
    body: data,
    status: statusType.idle,
  },
  reducers: {},
});

export default tripDetailSlice.reducer;
