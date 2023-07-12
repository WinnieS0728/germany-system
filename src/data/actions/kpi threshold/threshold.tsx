import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";
import type { responseType } from "types/api";

export const setThreshold = createAsyncThunk(
  "threshold/setThreshold",
  async (year: string) => {
    const res: responseType[] = await api.threshold.fetch(year);
    return res;
  }
);
