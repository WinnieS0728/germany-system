import { Header } from "@/layouts/header";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SalesAnalyzeNav } from "./nav";
import { MySuspense } from "@/layouts/suspense";

const SalesAnalyze_overviewPage = lazy(()=>import('./overview'))

export default function SalesAnalyze() {
  return (
    <>
      <Header title='國外業務銷售報表' />
      <SalesAnalyzeNav />
      <MySuspense>
        <Routes>
          <Route
            index
            Component={SalesAnalyze_overviewPage}
          />
        </Routes>
      </MySuspense>
    </>
  );
}
