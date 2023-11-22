import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/index";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeDay } from "d3-time";

export const setWeekVisitData = createAsyncThunk(
  "weekVisit/setWeekVisit",
  async (date: string) => {
    const endDate = dateFormatter(timeDay.offset(new Date(date), 8));
    const res = await api.getVisitData.week({
      startDate: date,
      endDate,
    });
    return res;
  }
);
