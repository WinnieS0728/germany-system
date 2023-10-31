import { OsomSettingTable } from "@/components/kpi setting/osom/osom";
import { SettingLayout } from "@/pages/kpi/setting/setting layout";

function OsomPage() {
  return (
    <>
      <SettingLayout formId='osom'>
        <OsomSettingTable />
      </SettingLayout>
    </>
  );
}

export default OsomPage;
