import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";
import { fetchFormListBody } from "@/lib/api/travel apply/get list";

export const setListData = createAsyncThunk(
  "listTable/setListData",
  async (data: fetchFormListBody) => {
    const res = await api.getBusinessApplyList(data);

    return res;
  }
);
