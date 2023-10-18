import { createSlice } from "@reduxjs/toolkit";

import { statusType } from "types/api";

import { setWeekVisitData } from "@actions/visit data/set week visit";
import { visit_otherResType } from "@/api/visit store/visit store";

const data: visit_otherResType[] = [];

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
