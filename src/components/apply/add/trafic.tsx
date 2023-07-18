import { MySelect } from "@components/form/select";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export const TransportationForm = () => {
  const transportationOptions = [
    { label: "飛機", value: "airplane" },
    { label: "高鐵", value: "HS rail" },
    { label: "火車", value: "train" },
    { label: "郵輪", value: "ship" },
    { label: "計程車", value: "taxi" },
    { label: "自用車", value: "private car" },
    { label: "公務車", value: "business car" },
    { label: "其他", value: "other" },
  ];

  const { register, control } = useFormContext();
  const disable = useRef(true);

  const [value, setValue] = useState("0");

  function inputFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^\d]/g, "");
    setValue(value);
  }

  const isStay = useWatch({
    name: "IsLodging",
    control,
  });

  if (isStay === "Y") {
    disable.current = false;
  } else {
    disable.current = true;
  }

  useEffect(() => {
    if (isStay !== "Y") {
      setValue("0");
    }
  }, [isStay]);

  return (
    <fieldset className='space-y-2'>
      <div className='transportation label-input'>
        <label>交通工具 :</label>
        <Controller
          control={control}
          name='Transport'
          render={({ field: { onChange } }) => (
            <MySelect.Normal
              options={transportationOptions}
              onChange={onChange}
            />
          )}
        />
      </div>
      <div className='grid grid-cols-3'>
        <div className='stay label-input justify-start'>
          <label>是否住宿 :</label>
          <label className='space-x-2'>
            <input
              type='radio'
              {...register("IsLodging")}
              value={"Y"}
            />
            <span>Yes</span>
          </label>
          <label className='space-x-2'>
            <input
              type='radio'
              {...register("IsLodging")}
              value={"N"}
            />
            <span>No</span>
          </label>
        </div>
        <div className='stayDay label-input'>
          <label>住宿總天數 :</label>
          <input
            type='text'
            {...register("StayDays", {
              valueAsNumber: true,
            })}
            onClickCapture={(e) => {
              (e.target as HTMLInputElement).value = "";
            }}
            onChangeCapture={inputFilter}
            disabled={disable.current}
            value={value}
            autoComplete='off'
          />
        </div>
        <div className='totalDay label-input'>
          <label>出差總天數 :</label>
          <p>0</p>
        </div>
      </div>
    </fieldset>
  );
};
