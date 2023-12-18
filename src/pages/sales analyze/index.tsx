import { Header } from "@/layouts/header";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SalesAnalyzeNav } from "./nav";
import { MySuspense } from "@/layouts/suspense";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslation } from "react-i18next";

const kpiPage = lazy(() => import("./kpi"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function SalesAnalyze() {
  const { t } = useTranslation(["salesAnalyze"]);
  return (
    <QueryClientProvider client={queryClient}>
      <Header title={t("title")} />
      <SalesAnalyzeNav />
      <MySuspense>
        <Routes>
          <Route
            path='kpi'
            Component={kpiPage}
          />
        </Routes>
      </MySuspense>
      <scroll-to-top />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
