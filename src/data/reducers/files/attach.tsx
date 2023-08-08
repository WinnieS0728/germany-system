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
    body: initData,
    backend: attachData,
    status: statusType.idle,
  },
  reducers: {
    addFile: (state, action) => {
      const array = [...state.body];
      array.push(action.payload);
      state.body = array;
    },
    deleteFile: (state, action) => {
      const array = [...state.body];
      array.splice(action.payload, 1);
      state.body = array;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(setFormAttach.fulfilled, (state, action) => {
        state.status = statusType.succeeded;
        state.backend = action.payload as attachData[];
      })
      .addCase(setFormAttach.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setFormAttach.rejected, (state) => {
        state.status = statusType.failed;
        state.backend = attachData;
      }),
});

export default fileSlice.reducer;

export const { addFile, deleteFile } = fileSlice.actions;
