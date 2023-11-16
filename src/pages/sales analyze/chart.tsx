import { SalesChart } from "@/components/sales analyze/charts/sales chart";
import { ChartHeader } from "@/components/sales analyze/header filter/chart header";
import { Main } from "@/layouts/main";

export default function SalesCharts() {
  return (
    <>
      <Main>
        <>
          <ChartHeader />
          <SalesChart />
        </>
      </Main>
    </>
  );
}
