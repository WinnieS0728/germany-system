import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";
import type { responseType } from "types/api";

export const setWeekVisitData = createAsyncThunk(
  "weekVisit/setWeekVisit",
  async (date: string) => {
    const res: responseType[] = await api.getVisitData.week(date);
    return res;
  }
);
