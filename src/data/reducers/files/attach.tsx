import { setFormAttach } from "@/data/actions/files/fetch form attach";
import { statusType } from "@/types/api";
import { createSlice } from "@reduxjs/toolkit";

const initData: File[] = [];

interface attachData {
  FileId: string;
  FileName: string;
  FilePath: string;
  WebName: "BusinessTrip";
  WebID: string;
  ExecID: string;
  SIGNORDER: string;
}
const attachData: attachData[] = [];

const fileSlice = createSlice({
  name: "files",
  initialState: {
    body: { newFile: initData, formAttach: attachData },
    status: statusType.idle,
  },
  reducers: {
    addFile: (state, action) => {
      const array = [...state.body.newFile];
      array.push(action.payload);
      state.body.newFile = array;
    },
    deleteFile: (state, action) => {
      const array = [...state.body.newFile];
      array.splice(action.payload, 1);
      state.body.newFile = array;
    },
    clearFile: (state) => {
      state.body.newFile = initData;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(setFormAttach.fulfilled, (state, action) => {
        state.status = statusType.succeeded;
        state.body.formAttach = action.payload as attachData[];
      })
      .addCase(setFormAttach.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setFormAttach.rejected, (state) => {
        state.status = statusType.failed;
        state.body.formAttach = attachData;
      }),
});

export default fileSlice.reducer;

export const { addFile, deleteFile, clearFile } = fileSlice.actions;
