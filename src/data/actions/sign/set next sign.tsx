import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@api/index";

export const setNextSigner = createAsyncThunk(
  "formInfo/setNextSigner",
  async (id: string) => {
    const res: (object | undefined)[] = await api.getNextSigner(id);

    return res;
  }
);
