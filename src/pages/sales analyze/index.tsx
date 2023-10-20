import { Header } from "@/layouts/header";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SalesAnalyzeNav } from "./nav";
import { MySuspense } from "@/layouts/suspense";

const SalesAnalyze_overviewPage = lazy(()=>import('./overview'))
const YearSalesPage = lazy(()=>import('./year sales'))
const tireShopVisitPage = lazy(()=>import('./tire shop visit'))
const AtuVisitPage = lazy(()=>import('./atu visit'))
const UnVisitTireShop = lazy(()=>import('./unVisit tire shop'))
const KpiAchievementPage = lazy(()=>import('./kpi achievement'))

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
          <Route
            path="tireShopVisit"
            Component={tireShopVisitPage}
          />
          <Route
            path="yearSales"
            Component={YearSalesPage}
          />
          <Route
            path="atuVisit"
            Component={AtuVisitPage}
          />
          <Route
            path="unVisitTireShop"
            Component={UnVisitTireShop}
          />
          <Route
            path="kpiAchievement"
            Component={KpiAchievementPage}
          />
        </Routes>
      </MySuspense>
    </>
  );
}
