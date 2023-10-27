import { MySelect } from "@/components/form/select";
import { useId2name } from "@/hooks/id2name";
import { useOptions } from "@/hooks/useOptions";
import { useSelectRef } from "@/hooks/select ref";
import { memberResType } from "@/api/member/getMember";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const AgentForm = () => {
  const { t } = useTranslation("new form", { keyPrefix: "deputy" });
  const { control } = useFormContext();

  const { newFormRef } = useSelectRef();

  const { options } = useOptions();

  const { splitName } = useId2name();

  return (
    <>
      <label className='label-input'>
        <p>{t("deputy")} :</p>
        <Controller
          control={control}
          name='Deputy'
          render={({ field: { onChange } }) => (
            <MySelect.Async
              forwardRef={newFormRef.deputy}
              onChange={onChange}
              options={options.agent}
              getLabelFunction={(option: memberResType) => splitName(option)}
              getValueFunction={(option: memberResType) => option.EmpId}
              value='EmpId'
              placeholder={t("placeholder.deputy")}
            />
          )}
        />
      </label>
    </>
  );
};
