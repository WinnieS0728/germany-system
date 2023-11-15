import { Header } from "@/layouts/header";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { SalesAnalyzeNav } from "./nav";
import { MySuspense } from "@/layouts/suspense";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const SalesAnalyze_overviewPage = lazy(() => import("./overview"));
const YearSalesPage = lazy(() => import("./year sales"));
const tireShopVisitPage = lazy(() => import("./tire shop visit"));
const AtuVisitPage = lazy(() => import("./atu visit"));
const UnVisitTireShop = lazy(() => import("./unVisit tire shop"));
const UnOrderTireShop = lazy(() => import("./unOrder tire shop"));
const KpiAchievementPage = lazy(() => import("./kpi achievement"));
const SalesCharts = lazy(() => import("./chart"));

const queryClient = new QueryClient({
  defaultOptions:{
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function SalesAnalyze() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header title='國外業務銷售報表' />
      <SalesAnalyzeNav />
      <MySuspense>
        <Routes>
          <Route
            index
            Component={SalesAnalyze_overviewPage}
          />
          <Route
            path='tireShopVisit'
            Component={tireShopVisitPage}
          />
          <Route
            path='yearSales'
            Component={YearSalesPage}
          />
          <Route
            path='atuVisit'
            Component={AtuVisitPage}
          />
          <Route
            path='unVisitTireShop'
            Component={UnVisitTireShop}
          />
          <Route
            path='unOrderTireShop'
            Component={UnOrderTireShop}
          />
          <Route
            path='kpiAchievement'
            Component={KpiAchievementPage}
          />
          <Route
            path='salesCharts'
            Component={SalesCharts}
          />
        </Routes>
      </MySuspense>
      <scroll-to-top />
    </QueryClientProvider>
  );
}
