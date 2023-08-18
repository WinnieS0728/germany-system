import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";

export const setThreshold = createAsyncThunk(
  "threshold/setThreshold",
  async (year: string) => {
    const res = await api.threshold.fetch(year);
    return res;
  }
);
