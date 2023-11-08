import { OverviewHeader } from "@/components/sales analyze/header filter/oveview header";
import { AtuPayment } from "@/components/sales analyze/overview/atu payment";
import { AtuPaymentList } from "@/components/sales analyze/overview/atu payment list";
import { SalesList } from "@/components/sales analyze/overview/sales list";
import { SalesRank } from "@/components/sales analyze/overview/sales rank";
import { Main } from "@/layouts/main";

export default function SalesAnalyze_overviewPage() {
  return (
    <>
      <Main>
        <>
          <OverviewHeader />
          <SalesRank />
          <AtuPayment />
          <SalesList />
          <AtuPaymentList />
        </>
      </Main>
    </>
  );
}
