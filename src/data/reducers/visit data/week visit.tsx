import { createSlice } from "@reduxjs/toolkit";

import { responseType, statusType } from "types/api";

import { setWeekVisitData } from "@actions/visit data/set week visit";

const data: responseType[] = [];

const weekVisitSlice = createSlice({
  name: "weekVisit",
  initialState: {
    body: data,
    status: statusType.idle,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setWeekVisitData.fulfilled, (state, action) => {
        state.body = action.payload;
        state.status = statusType.succeeded;
      })
      .addCase(setWeekVisitData.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setWeekVisitData.rejected, (state) => {
        state.body = data;
        state.status = statusType.failed;
      });
  },
});

export default weekVisitSlice.reducer;
