import { signDataType } from "@/types";

export const TransportationBlock = ({ data }: { data: signDataType }) => {
  return (
    <article className='flex items-center justify-center gap-20'>
      <div className="w-full text-center">交通工具 : {data.transportation}</div>
      <div className="w-full text-center">出差總天數 : {data.days}</div>
      <div className="w-full text-center">是否住宿 : {data.isLodging}</div>
      <div className="w-full text-center">住宿總天數 : {data.stayDays}</div>
    </article>
  );
};
