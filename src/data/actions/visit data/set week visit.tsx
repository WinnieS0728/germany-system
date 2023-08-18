import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";

export const setWeekVisitData = createAsyncThunk(
  "weekVisit/setWeekVisit",
  async (date: string) => {
    const res = await api.getVisitData.week(date);
    return res;
  }
);
