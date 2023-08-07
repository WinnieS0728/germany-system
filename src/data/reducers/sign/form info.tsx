import { setNextSigner } from "@/data/actions/sign/set next sign";
import { setSignList } from "@/data/actions/sign/set sign list";
import { createSlice } from "@reduxjs/toolkit";
import { statusType } from "types/api";

const data = {
  formId: "",
  nextSign: {},
  signList: [] as unknown[],
  nowOrder: -1,
};

const formInfoSlice = createSlice({
  name: "formInfo",
  initialState: {
    body: data,
    status: statusType.idle,
  },
  reducers: {
    setFormId: (state, action) => {
      state.body.formId = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(setNextSigner.fulfilled, (state, action) => {
        state.status = statusType.succeeded;
        state.body.nextSign = action.payload;
        state.body.nowOrder = (
          action.payload[0] as {
            SIGNORDER: number;
          }
        )?.SIGNORDER;
      })
      .addCase(setNextSigner.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setNextSigner.rejected, (state) => {
        state.status = statusType.failed;
        state.body.nextSign = data.nextSign;
      })
      .addCase(setSignList.fulfilled, (state, action) => {
        state.status = statusType.succeeded;
        state.body.signList = action.payload;
      })
      .addCase(setSignList.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setSignList.rejected, (state) => {
        state.status = statusType.failed;
        state.body.signList = data.signList;
      }),
});

export default formInfoSlice.reducer;
export const { setFormId } = formInfoSlice.actions;
