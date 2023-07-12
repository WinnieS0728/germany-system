import { createSlice } from "@reduxjs/toolkit";
import { setSalesList } from "@actions/member/setSalesList";
import { stateType, statusType } from "types/api";

const data: stateType = [];

const salesListSlice = createSlice({
  name: "salesList",
  initialState: {
    body: data,
    status: statusType.idle,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setSalesList.fulfilled, (state, action) => {
        state.status = statusType.succeeded;
        state.body = action.payload;
      })
      .addCase(setSalesList.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setSalesList.rejected, (state) => {
        state.status = statusType.failed;
        state.body = data;
      });
  },
});

export default salesListSlice.reducer;
