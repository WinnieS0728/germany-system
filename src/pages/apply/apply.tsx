import { NewForm } from "@/pages/apply/new apply";
import { ListPage } from "@/pages/apply/list page";
import { Header } from "@/layouts/header";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const ApplyPage = () => {
  return (
    <>
      <Header title='國內外出差申請單' />
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
          <Route
            path='sign'
            element={<h1>表單簽核</h1>}
          />
        </Routes>
      </Suspense>
    </>
  );
};

export default ApplyPage;
