import { lazy, useEffect } from "react";
import { Suspense } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setSalesList } from "@actions/member/setSalesList";
import { setUser } from "@actions/member/setUser";
import { useTranslation } from "react-i18next";

const CustomRatePage = lazy(() => import("@pages/custom rate"));
const EditPage = lazy(() => import("@pages/edit/edit"));
const ApplyPage = lazy(() => import("@pages/apply/apply"));

function App() {
  const dispatch = useAppDispatch();
  const nowUser = useAppSelector((state) => state.nowUser);
  const { i18n } = useTranslation();

  const [search] = useSearchParams();

  const EmpID = nowUser.body.EmpId || search.get("userID");

  const usingLanguage = nowUser.body.Language?.split("-")[0];

  useEffect(() => {
    dispatch(setSalesList());
    dispatch(setUser(EmpID as string));
    i18n.changeLanguage(usingLanguage);
  }, [dispatch, EmpID, i18n, usingLanguage]);

  return (
    <Suspense fallback={<h1>那你網路很慢欸</h1>}>
      <Routes>
        <Route
          index
          element={<CustomRatePage />}
        />
        <Route
          path='setting/*'
          element={<EditPage />}
        />
        <Route
          path='apply/*'
          element={<ApplyPage />}
        />
        <Route
          path='*'
          element={<h1>欸不是啊怎麼沒有這頁R</h1>}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
