import { Main } from "@/layouts/main";
import { ChartHeader } from "@/components/sales analyze/header filter/chart header";
import { SalesChart } from "@/components/sales analyze/charts/sales chart";
import { ExistCusVisitChart } from "@/components/sales analyze/charts/existCus chart";
import { OsomChart } from "@/components/sales analyze/charts/osom chart";

export default function SalesCharts() {
  return (
    <>
      <Main>
        <>
          <ChartHeader />
          <SalesChart />
          <ExistCusVisitChart />
          <OsomChart />
        </>
      </Main>
    </>
  );
}
