import { MySelect } from "@/components/form/select";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const MoneyForm = () => {
  const { register, control } = useFormContext();

  const moneyTypeOptions = [
    { label: "台幣", value: "TW" },
    { label: "美金", value: "US" },
    { label: "歐元", value: "EU" },
  ];

  const [value, setValue] = useState<string>("0");

  function inputFilter(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      setValue("0");
      return;
    }
    const value = e.target.value.replace(/[^\d]/g, "") || "0";
    setValue(parseInt(value).toLocaleString());
  }

  return (
    <div className='flex gap-4'>
      <div className='label-input'>
        <label>預支差旅費 :</label>
        <input
          type='text'
          {...register("Advance_Amount", {
            setValueAs: (d: string) => {
              return parseInt(d.replace(/,/g, ""));
            },
          })}
          onChangeCapture={inputFilter}
          autoComplete='off'
          value={value}
          onFocusCapture={() => {
            setValue("");
          }}
        />
      </div>
      <div className='label-input'>
        <label>幣別 :</label>
        <Controller
          control={control}
          name='Curr'
          render={({ field: { onChange } }) => (
            <MySelect.Normal
              options={moneyTypeOptions}
              onChange={onChange}
              placeholder='請選擇'
            />
          )}
        />
      </div>
    </div>
  );
};
