import { lazy, useLayoutEffect } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@data/store";
import { setSalesList } from "@actions/member/setSalesList";
import { setUser } from "@actions/member/setUser";
import { useTranslation } from "react-i18next";
import { MySuspense } from "./layouts/suspense";
import { useGetLocation } from "./hooks/use get location";

const CustomRatePage = lazy(() => import("@/pages/kpi"));
const SettingPage = lazy(() => import("@/pages/kpi/setting"));
const ApplyPage = lazy(() => import("@/pages/visit apply"));
const SalesAnalyze = lazy(() => import("@pages/sales analyze"));

function App() {
  const dispatch = useAppDispatch();
  const { Language, EmpId } = useAppSelector((state) => state.nowUser).body;
  const { i18n } = useTranslation();
  const [search, setSearch] = useSearchParams();
  const usingLanguage = Language?.split("-")[0];
  const nowUser_id = EmpId;

  useLayoutEffect(() => {
    let EmpId: string;
    if (search.get("userID")) {
      EmpId = search.get("userID") as string;
    } else {
      EmpId = nowUser_id;
      setSearch(
        (prev) => {
          prev.set("userID", EmpId);
          return prev;
        },
        { replace: true }
      );
    }
    dispatch(setSalesList());
    dispatch(setUser(EmpId as string));
    i18n.changeLanguage(usingLanguage);
  }, [dispatch, i18n, nowUser_id, search, setSearch, usingLanguage]);

  return (
    <>
      <MySuspense>
        <Routes>
          <Route
            index
            path='/'
            element={
              <h1 className='h-screen grid place-items-center'>德國業務系統</h1>
            }
          />
          <Route
            path='kpi'
            element={<CustomRatePage />}
          />
          <Route
            path='kpiSetting/*'
            element={<SettingPage />}
          />
          <Route
            path='visitApply/*'
            element={<ApplyPage />}
          />
          <Route
            path='salesAnalyze/*'
            Component={SalesAnalyze}
          />
          <Route
            path='*'
            element={<h1>欸不是啊怎麼沒有這頁R</h1>}
          />
        </Routes>
      </MySuspense>
    </>
  );
}

export default App;
