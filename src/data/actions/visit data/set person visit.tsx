import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";
import type { responseType } from "types/api";

export const setPersonVisitData = createAsyncThunk(
  "personVisit/setPersonVisit",
  async (id: string) => {
    const res: responseType[] = await api.getVisitData.person(id);
    return res;
  }
);
