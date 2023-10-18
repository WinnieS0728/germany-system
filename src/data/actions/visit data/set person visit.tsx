import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/index";

export const setPersonVisitData = createAsyncThunk(
  "personVisit/setPersonVisit",
  async (id: string) => {
    const res = await api.getVisitData.person(id);
    return res;
  }
);
