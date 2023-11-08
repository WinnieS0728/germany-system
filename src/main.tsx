import "react-day-picker/dist/style.css";
import "react-toastify/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
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
import "@winnies0728/orange-component";
// import { OverviewHeader } from "./components/sales analyze/header filter/oveview header.tsx";
// import { SalesList } from "./components/sales analyze/overview/sales list.tsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  // <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HashRouter>
          {/* <Routes>
            <Route
              path='header-filter'
              Component={OverviewHeader}
            />
            <Route
              path='order-table'
              Component={SalesList}
            />
          </Routes> */}
          <App />
          <ToastContainer
            position='top-center'
            autoClose={2000}
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
  // </QueryClientProvider>
  // </React.StrictMode>
);
