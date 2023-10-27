import { signDataType } from "@/types";
import { useTranslation } from "react-i18next";

export const TransportationBlock = ({ data }: { data: signDataType }) => {
  const { t } = useTranslation("new form");
  return (
    <article className='grid grid-cols-2 items-center justify-center gap-2 lg:grid-cols-4'>
      <div className='w-full text-center'>
        {t("transport.transportation")} : {data.transportation.replace(/,/gi,', ')}
      </div>
      <div className='w-full text-center'>
        {t("transport.tripDay")} : {data.days}
      </div>
      <div className='w-full text-center'>
        {t("transport.isStay")} : {data.isLodging}
      </div>
      <div className='w-full text-center'>
        {t("transport.stayDay")} : {data.stayDays}
      </div>
    </article>
  );
};
