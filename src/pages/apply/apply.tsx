import { ListTable } from "@/components/apply/list table";
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
            element={<ListTable />}
          />
          <Route
            path='add'
            element={<h1>新表單</h1>}
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
