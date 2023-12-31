import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/index";

export const setSignList = createAsyncThunk(
  "formInfo/setSignList",
  async (id: string) => {
    const res = await api.getSignList(id);    

    return res;
  }
);
