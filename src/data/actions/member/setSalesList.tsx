import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api/index";

const salesMemberList = [
  // "223001",
  // "ER221001", // ? Marcus.Rosenzweig
  "ER221002", // ? Ismail.Kemcen
  "ER222003", // ? Cemal.Altunkaya
  "ER224001", // ? Seyfi.Cetinkaya
  "ER224003", // ? Andres.CostaVega

  // ! 離職員工
  // "ER221003", // ? Michael.Boé
  // "ER219003", // ? Mohamed.Akabbal
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
