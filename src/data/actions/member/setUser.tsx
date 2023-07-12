import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";
import type { responseType } from "types/api";

export const setUser = createAsyncThunk(
  "nowUser/setNowUser",
  async (id: string | undefined) => {
    const res: responseType[] = await api.getMember(id);   

    return res;
  }
);
