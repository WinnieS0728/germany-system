import { TxSettingTable } from "@/components/edit/tx/setting table";
import { SettingLayout } from "@/layouts/setting layout";

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
