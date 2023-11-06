import { OverviewHeader } from "@/components/sales analyze/header filter/oveview header";
import { SalesList } from "@/components/sales analyze/overview/sales list";
import { SalesRank } from "@/components/sales analyze/overview/sales rank";
import { Main } from "@/layouts/main";

export default function SalesAnalyze_overviewPage() {
  return (
    <>
      <Main>
        <>
          {/* <OverviewHeader /> */}
          {/* <SalesRank /> */}
          <SalesList />
        </>
      </Main>
    </>
  );
}
