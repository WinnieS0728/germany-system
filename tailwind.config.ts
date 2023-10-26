/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myBlack: "#101010",
        myWhite: "#f6f6f6",
        myRed: "#DC143C",
        myBlue: "#6495ED",
        sectionHeader: "#3C474F",
        navBgc: "#1D2F3C",
        navActive: "#FF5600",
        tableBgc: "#E8E8E8",
        tableBgc_darker: "#868686",
        error_table: "#FFE3E4",
        submitBtn: "#FB8626",
        threshold_bgc: "#D6EAFB",
        headForm_bgc: "#E6E5E5",
        createCus: "#FB5D00",
        buttonDisable: "#878787",
        confirmTable: {
          header: "#FFD9BE",
          header_weekend: "#FF4401",
          atu: "#f6f6f6",
          old: "#DDEFFA",
          new: "#CDFDCE",
        },
        sign_header: "#FFAB28",
        sign_content: "#FFE2CB",
        myGreen: "#7cf29d",
      },
    },
  },
  plugins: [],
};
