import { Required } from "@/components/form/required";
import { MySelect } from "@/components/form/select";
import { useOptions } from "@/hooks/options";
import { useSelectRef } from "@/hooks/select ref";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const MoneyForm = () => {
  const { t } = useTranslation("new form", { keyPrefix: "money" });
  const { register, control, setValue } = useFormContext();
  const { options } = useOptions();
  const [inputValue, setInputValue] = useState<string>("0");
  const { newFormRef } = useSelectRef();

  const watch_money = useWatch({
    name: "Advance_Amount",
    control,
  });

  function inputFilter(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setInputValue("0");
      return;
    }
    const value = e.target.value.replace(/[^\d]/g, "") || "0";
    setInputValue(parseInt(value).toLocaleString());
  }

  return (
    <div className='flex flex-col gap-4 sm:flex-row sm:gap-8'>
      <label className='label-input'>
        {t("amount")} :
        <input
          type='text'
          className='w-full'
          {...register("Advance_Amount", {
            setValueAs: (d: string) => {
              return d.replace(/,/g, "");
            },
          })}
          onChangeCapture={inputFilter}
          autoComplete='off'
          value={inputValue}
          onFocusCapture={() => {
            setInputValue("");
          }}
          onBlur={() => {
            if (inputValue === "") {
              setInputValue("0");
              setValue("Advance_Amount", "0");
              setValue("Curr", "");
              newFormRef.curr.current?.clearValue();
            }
          }}
        />
      </label>

      <label className='label-input'>
        {watch_money !== "0" && <Required />}
        {t("curr")} :
        <Controller
          control={control}
          name='Curr'
          render={({ field: { onChange } }) => (
            <MySelect.Normal
              forwardRef={newFormRef.curr}
              options={options.curr}
              onChange={onChange}
              placeholder={t("placeholder.curr")}
            />
          )}
        />
      </label>
    </div>
  );
};
