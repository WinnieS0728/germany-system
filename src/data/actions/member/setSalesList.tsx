import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/index";

const salesMemberList = [
  // "223001",
  "ER221001", // ? Marcus
  "ER221002", // ? Ismail
  // "ER221003",
  "ER222003", // ? Cemal
  // "ER219003", 
  // 2024 新進員工
  "ER224001", // ? Seyfi
  "ER224003", // ? Andres
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
