import { VisitStoreSettingTable } from "@/components/kpi setting/visit store/visit store";
import { SettingLayout } from "@/pages/kpi/setting/setting layout";

function VisitStorePage() {
  return (
    <>
      <SettingLayout formId='store'>
        <VisitStoreSettingTable />
      </SettingLayout>
    </>
  );
}

export default VisitStorePage;
