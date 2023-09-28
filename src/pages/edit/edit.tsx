import { Header } from "@layouts/header";
import { Outlet, Route, Routes } from "react-router-dom";
import { Nav } from "@/pages/edit/edit nav";
import { useTranslation } from "react-i18next";
import { Suspense, lazy } from "react";

const Coming = lazy(() => import("@layouts/coming"));

const TxPage = lazy(() => import("./tx"));
const ThresholdPage = lazy(() => import("./threshold"));

const EditPage = () => {
  const { t } = useTranslation(["settingPage"]);
  return (
    <>
      <Header title={t("title")} />
      <Nav />
      <Suspense fallback={<h1>欸你等一下啦</h1>}>
        <Routes>
          <Route
            path='tx'
            element={<TxPage />}
          />
          <Route
            path='threshold'
            element={<ThresholdPage />}
          />
          <Route
            path='store'
            element={<Coming />}
          />
          <Route
            path='osom'
            element={<Coming />}
          />
        </Routes>
      </Suspense>
      <Outlet />
    </>
  );
};

export default EditPage;
