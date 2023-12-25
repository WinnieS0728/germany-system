import TxTable from "@/components/kpi setting/tx";
import { SettingLayout } from "@/pages/kpi/setting/setting layout";

function TxPage() {
  return (
    <>
      <SettingLayout formId='tx'>
        <>
          <TxTable />
        </>
      </SettingLayout>
    </>
  );
}

export default TxPage;
