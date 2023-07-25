import { useOptions } from "@/hooks/options";
import { useAppSelector } from "@/hooks/redux";
import { useSelectRef } from "@/hooks/select ref";
import { MySelect } from "@components/form/select";
import { timeDay } from "d3-time";
import { useEffect, useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";

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

  const { options } = useOptions();

  const { register, control, setValue } = useFormContext();
  const { newFormRef } = useSelectRef();
  const detailData = useAppSelector((state) => state.tripDetail);
  const stayList = detailData.body.map((d) => {
    return d.data.map((i) => i.hotel);
  });

  function getDays(date: { startDate: string; endDate: string }): number {
    if (!date || !date.startDate || !date.endDate) {
      return 0;
    }
    const start = new Date(`${date.startDate}:00:00:00`);
    const end = new Date(`${date.endDate}:00:00:00`);

    const days = timeDay.count(start, end);
    return days + 1 || 0;
  }

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
      isStay = "Yes";
    } else {
      isStay = "No";
    }

    const stayDayList = isStayList.map((i, index) => {
      if (!i) {
        return 0;
      } else {
        const days = getDays(date[index]) - 1;
        return days > 0 ? days : 0;
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

  const outDays = useMemo(() => {
    if (!date) {
      return;
    }
    const dayList = date
      .map((day) => [day.startDate, day.endDate])
      .reduce((a, b) => a.concat(b), [])
      .map((day) => new Date(day).getTime())
      .sort((a, b) => a - b);
    return (
      timeDay.count(
        new Date(dayList[0]),
        new Date(dayList[dayList.length - 1])
      ) + 1 || 0
    );
  }, [date]);

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
            <MySelect.Async
              forwardRef={newFormRef.transport}
              options={options.transport}
              onChange={onChange}
              getLabelFunction={(option: any) => option.ResourcesName}
              getValueFunction={(option: any) => option.ResourcesId}
              value='ResourcesId'
              placeholder='選擇交通工具'
            />
          )}
        />
      </div>
      <div className='grid grid-cols-3'>
        <div className='stay label-input justify-start'>
          <label>是否住宿 :</label>
          <input
            type='text'
            {...register("IsLodging")}
            autoComplete='off'
            className='noBorder w-[5em]'
            readOnly
          />
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
            className='noBorder w-[5em]'
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
            className='noBorder w-[5em]'
          />
        </div>
      </div>
    </fieldset>
  );
};
