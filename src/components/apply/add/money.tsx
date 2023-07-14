import { MySelect } from "@/components/form/select";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const MoneyForm = () => {
  const { register, control } = useFormContext();

  const moneyTyoeOptions = [
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
    const value = e.target.value.replace(/[^\d]/g, "");
    setValue(parseInt(value).toLocaleString());
  }

  return (
    <div className='flex gap-4'>
      <div className='label-input'>
        <label className='min-w-fit'>預支差旅費 :</label>
        <input
          type='text'
          {...register("money", {
            setValueAs: (d) => {
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
        <label className='min-w-fit'>幣別 :</label>
        <Controller
          control={control}
          name='moneyType'
          render={({ field: { onChange } }) => (
            <MySelect.Normal
              options={moneyTyoeOptions}
              onChange={onChange}
              placeholder='請選擇'
            />
          )}
        />
      </div>
    </div>
  );
};
