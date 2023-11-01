import { Main } from "@/layouts/main";
import { OverviewHeader } from "@/components/sales analyze/header filter/oveview header";
import { AtuVisitList } from "@/components/sales analyze/atu visit/visit list";

export default function AtuVisitPage() {
  return (
    <>
      <Main>
        <>
          <OverviewHeader />
          <AtuVisitList />
        </>
      </Main>
    </>
  );
}
