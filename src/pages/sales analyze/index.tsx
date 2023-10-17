import { Header } from "@/layouts/header";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SalesAnalyzeNav } from "./nav";

const SalesAnalyze_overviewPage = lazy(()=>import('./overview'))

export default function SalesAnalyze() {
  return (
    <>
      <Header title='國外業務銷售報表' />
      <SalesAnalyzeNav />
      <Suspense>
        <Routes>
          <Route
            index
            Component={SalesAnalyze_overviewPage}
          />
        </Routes>
      </Suspense>
    </>
  );
}
