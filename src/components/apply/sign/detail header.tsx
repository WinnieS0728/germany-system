import { detailDataWithSingleData } from "@/data/reducers/trip detail/trip detail";

export const DetailHeaderBlock = ({ data }: { data: detailDataWithSingleData[] }) => {
  const dateList = data[0].date as string[];

  return (
    <div className='flex items-center justify-center gap-12'>
      <p>出差日期(起) : {dateList[0]}</p>
      <p>出差日期(迄) : {dateList[dateList.length - 1]}</p>
    </div>
  );
};
