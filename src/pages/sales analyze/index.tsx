import { Header } from "@/layouts/header";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SalesAnalyzeNav } from "./nav";
import { MySuspense } from "@/layouts/suspense";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useTranslation } from "react-i18next";

const kpiPage = lazy(() => import("./kpi"));

export default function SalesAnalyze() {
  const { t } = useTranslation(["salesAnalyze"]);
  return (
    <>
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
    </>
  );
}
