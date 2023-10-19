import { Header } from "@/layouts/header";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MySuspense } from "@/layouts/suspense";

const ListPage = lazy(() => import("./apply/list page"));
const NewForm = lazy(() => import("./apply/new apply"));
const SignPage = lazy(() => import("./sign/sign"));
const PrintPage = lazy(() => import("./print"));

const ApplyPage = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Header title={t("title.businessTripApply")} />
      <MySuspense>
        <Routes>
          <Route
            index
            Component={ListPage}
          />
          <Route
            path='add'
            Component={NewForm}
          />
          <Route
            path='sign/:formId'
            Component={SignPage}
          />
          <Route
            path='print/:formId'
            Component={PrintPage}
          />
        </Routes>
      </MySuspense>
    </>
  );
};

export default ApplyPage;
