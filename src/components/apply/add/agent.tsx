import { Required } from "@/components/form/required";
import { MySelect } from "@/components/form/select";
import { useOptions } from "@/hooks/options";
import { useSelectRef } from "@/hooks/select ref";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const AgentForm = () => {
  const { i18n, t } = useTranslation("new form", { keyPrefix: "deputy" });
  const nowLang = i18n.language;
  const { control } = useFormContext();

  const { newFormRef } = useSelectRef();

  const { options } = useOptions();

  return (
    <div className='label-input'>
      <label>
        <Required />
        {t("deputy")} :
      </label>
      <Controller
        control={control}
        name='Deputy'
        render={({ field: { onChange } }) => (
          <MySelect.Async
            forwardRef={newFormRef.deputy}
            onChange={onChange}
            options={options.agent}
            getLabelFunction={(option: any) => {
              if (nowLang === "en") {
                return option.FullName.split("/")[0];
              }
              return option.EmpName;
            }}
            getValueFunction={(option: any) => option.EmpId}
            value='EmpId'
            placeholder={t("placeholder.deputy")}
          />
        )}
      />
    </div>
  );
};
