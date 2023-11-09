import { Main } from "@/layouts/main";
import { OverviewHeader } from "@/components/sales analyze/header filter/oveview header";
import { TireShopVisitTotal } from "@/components/sales analyze/tire shop visit/tire shop visit";

export default function TireShopVisitPage() {
  return (
    <>
      <Main>
        <>
          <OverviewHeader />
          <TireShopVisitTotal />
        </>
      </Main>
    </>
  );
}
