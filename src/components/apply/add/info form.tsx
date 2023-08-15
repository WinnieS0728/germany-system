import { dateFormatter } from "@/hooks/dateFormatter";
import { useAppSelector } from "@/hooks/redux";
import { component } from "@/types";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
  const { i18n, t } = useTranslation(["common", "new form"]);
  const nowLang = i18n.language;
  const nowUser = useAppSelector((state) => state.nowUser).body;

  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("DeptId", nowUser.DeptId);
    setValue("CreateId", nowUser.EmpId);
  }, [nowUser, setValue]);

  return (
    <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
      <Info
        title={t("info.id", { ns: "new form" })}
        content={type === "addForm" ? t("auto") : (data?.id as string)}
      />
      <Info
        title={t("info.date", { ns: "new form" })}
        content={
          type === "addForm"
            ? dateFormatter(new Date())
            : (data?.createDate as string)
        }
      />
      <Info
        title={t("info.status", { ns: "new form" })}
        content={
          type === "addForm"
            ? t("signStatus.no", { ns: "common" })
            : (data?.status as string)
        }
      />
      <Info
        title={t("info.comp", { ns: "new form" })}
        content={
          type === "addForm"
            ? nowLang === "en"
              ? nowUser.ResourcesName_E
              : nowUser.ResourcesName
            : (data?.company as string)
        }
      />
      <Info
        title={t("info.dept", { ns: "new form" })}
        content={
          type === "addForm"
            ? nowLang === "en"
              ? nowUser.DeptName_E
              : nowUser.DeptName
            : (data?.dept as string)
        }
      />
      <Info
        title={t("info.emp", { ns: "new form" })}
        content={
          type === "addForm"
            ? nowLang === "en"
              ? nowUser.FullName.split("/")[0]
              : nowUser.EmpName
            : (data?.EmpName as string)
        }
      />
    </div>
  );
};
