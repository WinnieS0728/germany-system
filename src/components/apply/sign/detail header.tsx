import { detailDataWithSingleData } from "@/data/reducers/trip detail/trip detail";

export const DetailHeaderBlock = ({
  data,
}: {
  data: detailDataWithSingleData[];
}) => {
  const dateList = data[0].date as string[];

  return (
    <div className='flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6 md:gap-12'>
      <p>
        出差日期(起) :
        <span style={{ whiteSpace: "nowrap" }}> {dateList[0]}</span>{" "}
      </p>
      <p>
        出差日期(迄) :
        <span style={{ whiteSpace: "nowrap" }}>
          {" "}
          {dateList[dateList.length - 1]}
        </span>
      </p>
    </div>
  );
};
