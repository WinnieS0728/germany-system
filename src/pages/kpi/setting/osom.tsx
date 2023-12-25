import OsomTable from "@/components/kpi setting/osom";
import { SettingLayout } from "@/pages/kpi/setting/setting layout";

function OsomPage() {
  return (
    <>
      <SettingLayout formId='osom'>
        <OsomTable />
      </SettingLayout>
    </>
  );
}

export default OsomPage;
