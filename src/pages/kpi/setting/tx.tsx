import { TxSettingTable } from "@/components/edit/tx/setting table";
import { SettingLayout } from "@/pages/kpi/setting/setting layout";

function TxPage() {
  return (
    <>
      <SettingLayout formId='tx'>
        <TxSettingTable />
      </SettingLayout>
    </>
  );
}

export default TxPage;
