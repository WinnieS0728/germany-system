import { useAppSelector } from "@/hooks/redux";
import { MySelect } from "@components/form/select";
import { timeDay } from "d3-time";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

interface date {
  startDate: string;
  endDate: string;
}
interface formProp {
  date: date[];
}

export const TransportationForm = ({ date }: formProp) => {
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

  const { register, control, setValue } = useFormContext();
  const detailData = useAppSelector((state) => state.tripDetail);
  const stayList = detailData.body.map((d) => {
    return d.data.map((i) => i.hotel);
  });

  const stayDays = useMemo(() => {
    const isStayList = stayList.map((d) => {
      if (d.some((i) => i !== "")) {
        return true;
      } else {
        return false;
      }
    });

    let isStay;
    if (isStayList.some((i) => i)) {
      isStay = "Y";
    } else {
      isStay = "N";
    }

    const stayDayList = isStayList.map((i, index) => {
      if (i) {
        return getDays(date[index]) - 1;
      } else {
        return 0;
      }
    });
    const stayDay = stayDayList.reduce((a, b) => a + b, 0);

    return {
      isStay: isStay,
      day: stayDay,
    };
  }, [date, stayList]);

  useEffect(() => {
    setValue("IsLodging", stayDays.isStay);
    setValue("StayDays", stayDays.day);
  }, [stayDays, setValue]);

  function getDays(date: { startDate: string; endDate: string }): number {
    const start = new Date(`${date.startDate}:00:00:00`);
    const end = new Date(`${date.endDate}:00:00:00`);

    const days = timeDay.count(start, end);
    return days + 1 || 0;
  }
  const outDays = date
    .map((d) => {
      return getDays(d);
    })
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    setValue("Days", outDays);
  }, [outDays, setValue]);

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
            autoComplete='off'
            readOnly
            className='w-[5em]'
          />
        </div>
        <div className='totalDay label-input'>
          <label>出差總天數 :</label>
          <input
            type='text'
            {...register("Days", {
              valueAsNumber: true,
            })}
            autoComplete='off'
            readOnly
            className='w-[5em]'
          />
        </div>
      </div>
    </fieldset>
  );
};
