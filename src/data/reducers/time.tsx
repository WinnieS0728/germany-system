import { createSlice } from "@reduxjs/toolkit";
import { timeFormat } from "d3";

interface dateType {
  today: string;
  thisYear: string;
  thisMonth: string;
  thisWeek: string;
}

const data: dateType = {
  // now: new Date(),
  today: timeFormat("%Y-%m-%d")(new Date()),
  thisYear: timeFormat("%Y")(new Date()),
  thisMonth: timeFormat("%m")(new Date()),
  thisWeek: timeFormat("%W")(new Date()),
};

const timeSlice = createSlice({
  name: "time",
  initialState: data,
  reducers: {},
});

export default timeSlice.reducer;
