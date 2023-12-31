import { ThresholdSettingTable } from "@/components/kpi setting/threshold/threshold";
import { SettingLayout } from "@/pages/kpi/setting/setting layout";

const ThresholdPage = () => {
  return (
    <>
    <SettingLayout formId="threshold">
      <ThresholdSettingTable />
    </SettingLayout>
    </>
  );
};

export default ThresholdPage;
