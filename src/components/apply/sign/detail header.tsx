import { detailDataWithSingleData } from "@/data/reducers/trip detail/trip detail";
import { useTranslation } from "react-i18next";

interface props {
  data: detailDataWithSingleData[];
}

export const DetailHeaderBlock = ({ data }: props) => {

  const { t } = useTranslation("list page");
  const dateList = data[0].date as string[];
  const hotel = data[0].data.hotel;

  return (
    <div className='flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center sm:gap-6 md:gap-12'>
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
      <p>
        {t("detailTable.thead.lodging")} :
        <span style={{ whiteSpace: "nowrap" }}>{hotel}</span>
      </p>
    </div>
  );
};
