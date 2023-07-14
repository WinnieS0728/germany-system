import { useAppSelector } from "@/hooks/redux";
import { timeFormat } from "d3";

interface infoPropType {
  title: string;
  content: string;
  className?: string;
}
const Info = ({ title, content, className }: infoPropType) => {
  return (
    <div
      className={`${className} grid grid-cols-2 items-center justify-center gap-2`}
    >
      <span className='text-end'>{title} :</span>
      <span>{content}</span>
    </div>
  );
};
export const InfoForm = () => {
  const nowUser = useAppSelector((state) => state.nowUser);
  function getDate(d: Date) {
    return timeFormat("%Y-%m-%d")(d);
  }

  return (
    <div className='grid grid-cols-3 gap-2'>
      <Info
        title='表單號碼'
        content='auto'
      />
      <Info
        title='建立日期'
        content={getDate(new Date())}
      />
      <Info
        title='簽核狀態'
        content='未簽核'
      />
      <Info
        title='公司別'
        content={nowUser.body.ResourcesName}
      />
      <Info
        title='部門'
        content={nowUser.body.DeptName}
      />
      <Info
        title='建檔人員'
        content={nowUser.body.EmpName}
      />
    </div>
  );
};
