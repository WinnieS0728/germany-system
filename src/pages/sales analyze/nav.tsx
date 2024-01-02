import { useMemo } from "react";
import { NavLink } from "react-router-dom";

type navBtn = {
  label: string;
  path: string;
};

export function SalesAnalyzeNav() {
  const salesAnalyzeNavRoutes: navBtn[] = useMemo(
    () => [
      { label: "德國業績總覽", path: "" },
      { label: "業務績效KPI", path: "kpi" },
      { label: "輪胎店銷售＆拜訪分析", path: "tireShop" },
      { label: "A.T.U銷售＆拜訪分析", path: "atu" },
      { label: "Wholesaler銷售＆拜訪分析", path: "wholesaler" },
      { label: "非 Orange 客戶", path: "notOrange" },
      { label: "業務出差拜訪佔比查詢", path: "visit" },
    ],
    []
  );

  return (
    <>
      <nav className='bg-navBgc'>
        <ul className='no-scrollBar flex gap-2 overflow-x-scroll p-2'>
          {salesAnalyzeNavRoutes.map((nav) => (
            <li
              key={nav.path}
              className='py-2'
            >
              <NavLink
                to={nav.path}
                end
                className='navBtn'
              >
                {nav.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
