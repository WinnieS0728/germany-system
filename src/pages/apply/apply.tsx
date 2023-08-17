import { NewForm } from "@/pages/apply/new apply";
import { ListPage } from "@/pages/apply/list page";
import { Header } from "@/layouts/header";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ApplyPage = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Header title={t("title.businessTripApply")} />
      <Suspense fallback={<h1>啊我還在跑...</h1>}>
        <Routes>
          <Route
            index
            element={<ListPage />}
          />
          <Route
            path='add'
            element={<NewForm />}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default ApplyPage;
