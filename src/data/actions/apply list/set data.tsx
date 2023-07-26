import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";
import type { responseType } from "types/api";

export const setListData = createAsyncThunk(
  "listTable/setListData",
  async (data: any) => {
    const res: responseType[] = await api.getBusinessApplyList(data);

    return res;
  }
);
