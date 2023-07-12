import { createSlice } from "@reduxjs/toolkit";

interface colorType {
  [props: string]: string;
}

const colorData: colorType = {
  black: "#101010",
  white: "#f6f6f6",
  red: "#DC143C",
  blue: "#6495ED",
  sectionHeader: "#3C474F",
  navBgc: "#1D2F3C",
  navActive: "#FF5600",
  tableBgc: "##E8E8E8",
  tableBgc_darker: "#868686",
  error_table: "#FFE3E4",
  submitBtn: "#FB8626",
  threshold_bgc:"#D6EAFB"
};

const colorSlice = createSlice({
  name: "color",
  initialState: colorData,
  reducers: {},
});

export default colorSlice.reducer;
