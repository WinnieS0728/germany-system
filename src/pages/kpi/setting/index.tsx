import { Header } from "@layouts/header";
import { Outlet, Route, Routes } from "react-router-dom";
import { Nav } from "@/pages/kpi/setting/setting nav";
import { useTranslation } from "react-i18next";
import { lazy } from "react";
import { MySuspense } from "@/layouts/suspense";
import AtuPage from "./atu";
const TxPage = lazy(() => import("./tx"));
const ThresholdPage = lazy(() => import("./threshold"));
const VisitStorePage = lazy(() => import("./visit store"));
const OsomPage = lazy(() => import("./osom"));

const EditPage = () => {
  const { t } = useTranslation(["settingPage"]);
  return (
    <>
      <Header title={t("title")} />
      <Nav />
      <MySuspense>
        <Routes>
          <Route
            index
            Component={TxPage}
          />
          <Route
            path='atu'
            Component={AtuPage}
          />
          <Route
            path='threshold'
            Component={ThresholdPage}
          />
          <Route
            path='store'
            Component={VisitStorePage}
          />
          <Route
            path='osom'
            Component={OsomPage}
          />
        </Routes>
      </MySuspense>
      <Outlet />
      <scroll-to-top />
    </>
  );
};

export default EditPage;
