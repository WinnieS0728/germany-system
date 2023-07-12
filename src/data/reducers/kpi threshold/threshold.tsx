import { createSlice } from "@reduxjs/toolkit";
import { setThreshold } from "@actions/kpi threshold/threshold";
import { responseType, statusType } from "types/api";

const data: responseType[] = [];

const thresholdSlice = createSlice({
  name: "threshold",
  initialState: {
    body: data,
    status: statusType.idle,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setThreshold.fulfilled, (state, action) => {
        state.status = statusType.succeeded;
        if (action.payload) {
          state.body = action.payload;
        }
      })
      .addCase(setThreshold.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setThreshold.rejected, (state) => {
        state.status = statusType.failed;
        state.body = data;
      });
  },
});

export default thresholdSlice.reducer;
