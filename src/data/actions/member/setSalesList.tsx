import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/index";

const salesMemberList = [
  // "223001",
  "ER221002",
  // "ER221003",
  "ER222003",
  "ER219003",
];

export const setSalesList = createAsyncThunk(
  "salesList/setSalesList",
  async () => {
    const res = await api.getMember();
    const salesList = salesMemberList
      .map((id) => {
        const list = res.find((i) => i.EmpId === id);
        return list;
      })
      .filter((data) => data);
    return salesList;
  }
);
