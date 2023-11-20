import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

type navBtn = {
  label: string;
  path: string;
};

export function SalesAnalyzeNav() {
  const { t } = useTranslation(["salesAnalyze"]);
  const salesAnalyzeNavRoutes: navBtn[] = useMemo(
    () => [
      { label: t("nav.overview"), path: "" },
      { label: t("nav.yearSales"), path: "yearSales" },
      { label: t("nav.tsVisit"), path: "tireShopVisit" },
      { label: t("nav.atuVisit"), path: "atuVisit" },
      { label: t("nav.unVisitTS"), path: "unVisitTireShop" },
      { label: t("nav.unOrderTS"), path: "unOrderTireShop" },
      { label: t("nav.kpiAchievement"), path: "kpiAchievement" },
      { label: t("nav.charts"), path: "salesCharts" },
    ],
    [t]
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
