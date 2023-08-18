import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";

export const setUser = createAsyncThunk(
  "nowUser/setNowUser",
  async (id: string | undefined) => {
    const res = await api.getMember(id);   

    return res;
  }
);
