import { MySelect } from "@components/form/select";
import { useEffect, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

export const TrafficForm = () => {
  const trafficOptions = [
    { label: "飛機", value: "1" },
    { label: "高鐵", value: "2" },
    { label: "火車", value: "3" },
    { label: "郵輪", value: "4" },
    { label: "計程車", value: "5" },
    { label: "自用車", value: "6" },
    { label: "公務車", value: "7" },
    { label: "其他", value: "8" },
  ];

  const { register, control } = useFormContext();
  const disable = useRef(true);

  const [value, setValue] = useState("0");

  function inputFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^\d]/g, "");
    setValue(value);
  }

  const isStay = useWatch({
    name: "isStay",
    control,
  });

  if (isStay === "true") {
    disable.current = false;
  } else {
    disable.current = true;
  }

  useEffect(() => {
    if (isStay !== "true") {
      setValue("0");
    }
  }, [isStay]);

  return (
    <fieldset className='space-y-2'>
      <div className='traffic label-input'>
        <label className='min-w-fit'>交通工具 :</label>
        <Controller
          control={control}
          name='traffic'
          render={({ field: { onChange } }) => (
            <MySelect.Normal
              options={trafficOptions}
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
              {...register("isStay")}
              value={"true"}
            />
            <span>Yes</span>
          </label>
          <label className='space-x-2'>
            <input
              type='radio'
              {...register("isStay")}
              value={"false"}
            />
            <span>No</span>
          </label>
        </div>
        <div className='stayDay label-input'>
          <label className='min-w-fit'>住宿總天數</label>
          <input
            type='text'
            {...register("stayDay", {
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
          <label>出差總天數</label>
          <p>0</p>
        </div>
      </div>
    </fieldset>
  );
};
