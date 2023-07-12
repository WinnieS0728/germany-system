import { createSlice } from "@reduxjs/toolkit";
import { timeFormat } from "d3";

interface dateType {
  [props:string]:string
}

const data:dateType = {
  // now: new Date(),
  today: timeFormat("%Y-%m-%d")(new Date()),
  thisYear: timeFormat("%Y")(new Date()),
  thisMonth: timeFormat("%m")(new Date()),
  thisWeek: timeFormat("%W")(new Date()),
};

const timeSlice = createSlice({
  name: "time",
  initialState: data,
  reducers:{}
});

export default timeSlice.reducer;
