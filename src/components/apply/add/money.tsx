import { Required } from "@/components/form/required";
import { MySelect } from "@/components/form/select";
import { useSelectRef } from "@/hooks/select ref";
import { useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const MoneyForm = () => {
  const { t } = useTranslation("new form", { keyPrefix: "money" });
  const { register, control, setValue } = useFormContext();

  const moneyTypeOptions = [
    { label: t('eur'), value: "EUR" },
    { label: t('twd'), value: "TWD" },
    { label: t('rmb'), value: "RMB" },
    { label: t('usd'), value: "USD" },
  ];

  const watch_money = useWatch({
    name: "Advance_Amount",
    control,
  });

  const [inputValue, setInputValue] = useState<string>("0");
  const { newFormRef } = useSelectRef();

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
      <div className='label-input'>
        <label>{t('amount')} :</label>
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
      </div>
      <div className='label-input'>
        <label>{watch_money !== "0" && <Required />}{t('curr')} :</label>
        <Controller
          control={control}
          name='Curr'
          render={({ field: { onChange } }) => (
            <MySelect.Normal
              forwardRef={newFormRef.curr}
              options={moneyTypeOptions}
              onChange={onChange}
              placeholder={t('placeholder.curr')}
            />
          )}
        />
      </div>
    </div>
  );
};
