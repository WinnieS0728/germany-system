import { createSlice } from "@reduxjs/toolkit";
import { setUser } from "../actions/member/setUser";
import { statusType } from "@/types/api";
import { memberResType } from "@/api/member/getMember";

const data: memberResType = {
  DeptId: "",
  DeptName: "",
  DeptName_E: "",
  EmpId: "",
  EmpName: "",
  ResourcesId: "",
  ResourcesName: "",
  ResourcesName_E: "",
  Compose: "",
  FullName: "",
  Title: "",
  Language: "zh-TW",
};

const userSlice = createSlice({
  name: "nowUser",
  initialState: {
    body: data,
    status: statusType.idle,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUser.fulfilled, (state, action) => {
        state.status = statusType.succeeded;
        state.body = action.payload[0];
      })
      .addCase(setUser.pending, (state) => {
        state.status = statusType.loading;
      })
      .addCase(setUser.rejected, (state) => {
        state.status = statusType.failed;
        state.body = data;
      });
  },
});

export default userSlice.reducer;
