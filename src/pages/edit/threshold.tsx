import { ThresholdSettingTable } from "@/components/edit/threshold/threshold";
import { SettingLayout } from "@/layouts/setting layout";

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
