import AtuSettingTable from "@/components/kpi setting/atu";
import { SettingLayout } from "@/pages/kpi/setting/setting layout";

const AtuPage = () => {
  return (
    <>
    <SettingLayout formId="atu">
      <AtuSettingTable />
    </SettingLayout>
    </>
  );
};

export default AtuPage;
