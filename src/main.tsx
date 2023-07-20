import "react-day-picker/dist/style.css";
import "react-toastify/ReactToastify.css";
import "@styles/tailwind.scss";
import "@styles/index.scss";
import "./i18n.ts";

// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "@styles/theme.ts";
import { Provider } from "react-redux";
import store from "@/data/store";
import { ToastContainer } from "react-toastify";
import { QAQ } from "./qq2.tsx";
import { Styled_MySection } from "./sc.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <HashRouter>
        {/* <QAQ/> */}
        {/* <Styled_MySection /> */}
        <App />
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </HashRouter>
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
