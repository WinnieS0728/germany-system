import { Main } from "@/layouts/main";
import { OverviewHeader } from "@/components/fuck/sales analyze/header filter/oveview header";
import { AtuVisitList } from "@/components/fuck/sales analyze/atu visit/visit list";
import { VisitTotalTable } from "@/components/fuck/sales analyze/atu visit/visit total";

export default function AtuVisitPage() {
  return (
    <>
      <Main>
        <>
          <OverviewHeader />
          <VisitTotalTable />
          <AtuVisitList />
        </>
      </Main>
    </>
  );
}
