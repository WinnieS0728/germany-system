import { MySelect } from "@/components/form/select";
import { useSelectRef } from "@/hooks/select ref";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

export const MoneyForm = () => {
  const { register, control, setValue } = useFormContext();

  const moneyTypeOptions = [
    { label: "歐元", value: "EUR" },
    { label: "台幣", value: "TWD" },
    { label: "人民幣", value: "RMB" },
    { label: "美金", value: "USD" },
  ];

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
        <label>幣別 :</label>
        <Controller
          control={control}
          name='Curr'
          render={({ field: { onChange } }) => (
            <MySelect.Normal
              forwardRef={newFormRef.curr}
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
