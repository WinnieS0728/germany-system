import { Header } from "@layouts/header";
import { Outlet, Route, Routes } from "react-router-dom";
import { Nav } from "@/pages/kpi/setting/setting nav";
import { useTranslation } from "react-i18next";
import { lazy } from "react";
import { MySuspense } from "@/layouts/suspense";

const Coming = lazy(() => import("@layouts/coming"));
const TxPage = lazy(() => import("./tx"));
const ThresholdPage = lazy(() => import("./threshold"));

const EditPage = () => {
  const { t } = useTranslation(["settingPage"]);
  return (
    <>
      <Header title={t("title")} />
      <Nav />
      <MySuspense >
        <Routes>
          <Route
            index
            Component={TxPage}
          />
          <Route
            path='threshold'
            Component={ThresholdPage}
          />
          <Route
            path='store'
            Component={Coming}
          />
          <Route
            path='osom'
            Component={Coming }
          />
        </Routes>
      </MySuspense>
      <Outlet />
      <scroll-to-top />
    </>
  );
};

export default EditPage;
