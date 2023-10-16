import { Header } from "@/layouts/header";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { SalesAnalyzeNav } from "./nav";

export default function SalesAnalyze() {
  return (
    <>
      <Header title='國外業務銷售報表' />
      <SalesAnalyzeNav />
      <Suspense>
        <Routes>
          <Route
            index
            element={<>123</>}
          />
        </Routes>
      </Suspense>
    </>
  );
}
