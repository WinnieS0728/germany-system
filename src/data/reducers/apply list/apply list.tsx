import { setListData } from "@/data/actions/apply list/set data";
import { tripListResType } from "@/lib/api/travel apply/get list";
import { statusType } from "@/types/api";
import { createSlice } from "@reduxjs/toolkit";

const props = {
  EmpId: "",
  date: { start: "", end: "" },
  dept: "",
  formStatus: "",
};
const initData: tripListResType[] = [];

const listFormStateSlice = createSlice({
  name: "listTable",
  initialState: {
    props: props,
    body: initData,
    status: statusType.idle,
  },
  reducers: {
    setProps: (state, action) => {
      state.props = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(setListData.fulfilled, (state, action) => {
        state.body = action.payload;
        state.status = statusType.succeeded;
      })
      .addCase(setListData.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setListData.rejected, (state) => {
        state.body = initData;
        state.status = statusType.failed;
      }),
});

export default listFormStateSlice.reducer;

export const { setProps } = listFormStateSlice.actions;
