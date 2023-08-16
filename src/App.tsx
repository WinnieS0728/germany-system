import { lazy, useEffect, useState } from "react";
import { Suspense } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { setSalesList } from "@actions/member/setSalesList";
import { setUser } from "@actions/member/setUser";
import { useTranslation } from "react-i18next";

const CustomRatePage = lazy(() => import("@pages/custom rate"));
const EditPage = lazy(() => import("@pages/edit/edit"));
const ApplyPage = lazy(() => import("@pages/apply/apply"));
const SignPage = lazy(() => import("@pages/sign/sign"));

function App() {
  const dispatch = useAppDispatch();
  const nowUser = useAppSelector((state) => state.nowUser).body;
  const { i18n } = useTranslation();  

  const [search, setSearch] = useSearchParams();
  const [EmpId, setId] = useState<string>("");

  useEffect(() => {
    if (search.get("userID")) {
      setId(search.get("userID") as string);
    } else {
      setId(nowUser.EmpId);
      setSearch({ userID: nowUser.EmpId });
    }
  }, [nowUser, search, setSearch]);

  const usingLanguage = nowUser.Language?.split("-")[0];

  useEffect(() => {
    dispatch(setSalesList());
    dispatch(setUser(EmpId as string));
    i18n.changeLanguage(usingLanguage);
  }, [dispatch, EmpId, i18n, usingLanguage]);

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
          path='sign/:formId'
          element={<SignPage />}
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
