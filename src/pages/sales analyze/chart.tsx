import { Main } from "@/layouts/main";
import { ChartHeader } from "@/components/sales analyze/header filter/chart header";
import { SalesChart } from "@/components/sales analyze/charts/sales chart";
import { ExistCusVisitChart } from "@/components/sales analyze/charts/existCus chart";
import { OsomChart } from "@/components/sales analyze/charts/osom chart";
import { NewCusVisitChart } from "@/components/sales analyze/charts/newCus chart";
import { AtuVisitChart } from "@/components/sales analyze/charts/atu chart";
import { TireStorageChart } from "@/components/sales analyze/charts/tire storage chart";

export default function SalesCharts() {
  return (
    <>
      <Main>
        <>
          <ChartHeader />
          <SalesChart />
          <ExistCusVisitChart />
          <NewCusVisitChart />
          <AtuVisitChart />
          <OsomChart />
          <TireStorageChart />
        </>
      </Main>
    </>
  );
}
