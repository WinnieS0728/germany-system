
import StoreTable from "@/components/kpi setting/visit store";
import { SettingLayout } from "@/pages/kpi/setting/setting layout";

function VisitStorePage() {
  return (
    <>
      <SettingLayout formId='store'>
        <StoreTable />
      </SettingLayout>
    </>
  );
}

export default VisitStorePage;
