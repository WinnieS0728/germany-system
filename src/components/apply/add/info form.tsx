import { dateFormatter } from "@/hooks/dateFormatter";
import { useAppSelector } from "@/hooks/redux";
import { component } from "@/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

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
export const InfoForm = ({ type, data }: component) => {
  const nowUser = useAppSelector((state) => state.nowUser);

  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("DeptId", nowUser.body.DeptId);
    setValue("CreateId", nowUser.body.EmpId);
  }, [nowUser, setValue]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
      <Info
        title='表單號碼'
        content={type === "addForm" ? "auto" : (data?.id as string)}
      />
      <Info
        title='建立日期'
        content={
          type === "addForm"
            ? dateFormatter(new Date())
            : (data?.createDate as string)
        }
      />
      <Info
        title='簽核狀態'
        content={type === "addForm" ? "未簽核" : (data?.status as string)}
      />
      <Info
        title='公司別'
        content={
          type === "addForm"
            ? nowUser.body.ResourcesName
            : (data?.company as string)
        }
      />
      <Info
        title='部門'
        content={
          type === "addForm" ? nowUser.body.DeptName : (data?.dept as string)
        }
      />
      <Info
        title='建檔人員'
        content={
          type === "addForm" ? nowUser.body.EmpName : (data?.EmpName as string)
        }
      />
    </div>
  );
};
