import { Main } from "@/layouts/main";
import { KpiTable } from "@/components/fuck/sales analyze/kpi achievement/kpi table";
import { KpiAchievementHeader } from "@/components/fuck/sales analyze/header filter/kpi achievement header";

export default function KpiAchievementPage() {
  return (
    <>
      <Main>
        <>
          <KpiAchievementHeader />
          <KpiTable />
        </>
      </Main>
    </>
  );
}
