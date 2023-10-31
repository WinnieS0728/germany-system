import { NavLink } from "react-router-dom";

type navBtn = {
  label: string;
  path: string;
};

const salesAnalyzeNavRoutes: navBtn[] = [
  {
    label: "業務業績報表總覽",
    path: "",
  },
  {
    label: "年度業績列表",
    path: "yearSales",
  },
  // { label: "輪胎店拜訪紀錄", path: "tireShopVisit" },
  // { label: "ATU 拜訪紀錄", path: "atuVisit" },
  // { label: "未拜訪輪胎店查詢", path: "unVisitTireShop" },
  // { label: "未下單輪胎店查詢", path: "unOrderTireShop" },
  // { label: "KPI 執行進度查詢", path: "kpiAchievement" },
  // { label: "各項指標趨勢圖", path: "salesCharts" },
];

export function SalesAnalyzeNav() {
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
