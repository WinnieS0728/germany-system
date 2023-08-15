import { detailDataWithSingleData } from "@/data/reducers/trip detail/trip detail";
import { useTranslation } from "react-i18next";

export const DetailHeaderBlock = ({
  data,
}: {
  data: detailDataWithSingleData[];
}) => {
  const { t } = useTranslation("list page");
  const dateList = data[0].date as string[];

  return (
    <div className='flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6 md:gap-12'>
      <p>
        {t("detail.startDate")} :
        <span style={{ whiteSpace: "nowrap" }}> {dateList[0]}</span>{" "}
      </p>
      <p>
        {t("detail.endDate")} :
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {dateList[dateList.length - 1]}
        </span>
      </p>
    </div>
  );
};
