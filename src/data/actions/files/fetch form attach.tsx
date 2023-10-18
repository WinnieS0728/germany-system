import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/index";

export const setFormAttach = createAsyncThunk(
  "files/setFormAttach",
  async (id: string) => {
    const res = await api.getFormAttach(id);

    return res;
  }
);
