import { setNextSigner } from "@/data/actions/sign/set next sign";
import { setSignList } from "@/data/actions/sign/set sign list";
import { createSlice } from "@reduxjs/toolkit";
import { statusType } from "types/api";

export interface signList {
  FORMNO: string;
  SIGNORDER: number;
  STEPNAME: string;
  SIGNER: string;
  SIGNERNAME: string;
  ACTUALNAME: string;
  ACTUALSIGNER: string;
  SIGNRESULT: number & (0 | 1 | 2 | 3 | 4);
  OPINION: string;
  SIGNTIME: string;
  ALLOWCUSTOM: false;
  SignGroup: string;
  ISEnable: string;
  types: "0" | "1";
  ExceId: null;
  Status: null;
}

export interface nextSign {
  FORMNO: string;
  SIGNORDER: number;
  STEPNAME: string;
  SIGNER: string;
  SIGNERNAME: string;
  ACTUALNAME: string;
  ACTUALSIGNER: string;
  SIGNRESULT: number & (0 | 1 | 2 | 3 | 4);
  OPINION: string;
  SIGNTIME: null;
  ALLOWCUSTOM: false;
  SignGroup: string;
  ISEnable: string;
  types: "0" | "1";
  ExceId: null;
  Status: null;
}

type data = {
  formId: string;
  nextSign: nextSign | object;
  signList: signList[];
  nowOrder: number;
};
const data: data = {
  formId: "",
  nextSign: {},
  signList: [],
  nowOrder: 0,
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
        state.body.nextSign = action.payload[0] as object;
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
        state.body.signList = action.payload as signList[];
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
