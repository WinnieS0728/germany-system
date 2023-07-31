import { Required } from "@/components/form/required";
import { addDisabledDays } from "@/data/reducers/day picker/dayPickerControl";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { timeFormat } from "d3";
import { isValid } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange, DayPicker, SelectRangeEventHandler } from "react-day-picker";
import { useFormContext } from "react-hook-form";
import { useTheme } from "styled-components";

interface dateType {
  from: Date | string | undefined;
  to: Date | string | undefined;
}

interface headerProps {
  data: any;
  index: number;
}

export const DetailHeader = ({ data, index }: headerProps) => {
  const color = useTheme()?.color;
  const timeData = useAppSelector((state) => state.time);
  const [isShow, setShow] = useState(false);
  const [month, setMonth] = useState<Date>();
  const [range, setRange] = useState<dateType | undefined>({
    from: data.startDate || "",
    to: data.endDate || "",
  });

  const { register, setValue } = useFormContext();

  const Footer = () => {
    return (
      <span
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
          select 2 days
        </p>
      </span>
    );
  };

  function getTime(d: Date | undefined) {
    if (!isValid(d)) {
      return "";
    }
    const date = timeFormat("%Y-%m-%d")(d as Date);

    return date;
  }

  const dispatch = useAppDispatch();
  // const disabledDays = useAppSelector((state) => state.dayPicker);

  // const cantSelect = disabledDays.body.disabled.map((i) => {
  //   return {
  //     from: new Date(i.from),
  //     to: new Date(i.to),
  //   };
  // });

  function handleSelect(d: dateType) {
    // console.log(d);
    setRange(d);
    if (isValid(d?.from) && isValid(d?.to)) {
      setValue(`tripData.${index}`, {
        startDate: getTime(d.from as Date),
        endDate: getTime(d.to as Date),
      });
      setShow(false);
    }
  }

  useEffect(() => {
    if (range && range.from && range.to) {
      dispatch(addDisabledDays(range));
    }
  }, [range, dispatch]);

  return (
    <div className='flex items-center justify-between'>
      <div className='relative flex gap-8'>
        <div className='startDate label-input gap-1 space-x-2'>
          <label><Required />出差日期(起)</label>
          <input
            {...register(`tripData.${index}.startDate`)}
            className='date w-full'
            style={{
              cursor: "pointer",
              backgroundColor: color?.white,
              color: color?.black,
            }}
            autoComplete='off'
            value={getTime(range?.from as Date)}
            onClickCapture={() => {
              setShow((prev) => !prev);
            }}
            readOnly
            placeholder='開始日期'
          />
        </div>
        <div className='endDate label-input gap-1 space-x-2'>
          <label><Required />出差日期(迄)</label>
          <input
            {...register(`tripData.${index}.endDate`)}
            className='date w-full'
            style={{
              cursor: "pointer",
              backgroundColor: color?.white,
              color: color?.black,
            }}
            autoComplete='off'
            value={getTime(range?.to as Date)}
            onClickCapture={() => {
              setShow((prev) => !prev);
            }}
            readOnly
            placeholder='結束日期'
          />
        </div>
        <DayPicker
          mode='range'
          footer={<Footer />}
          selected={range as DateRange}
          onSelect={handleSelect as SelectRangeEventHandler}
          fromYear={2022}
          toYear={+timeData.thisYear + 1}
          month={month}
          onMonthChange={setMonth}
          captionLayout='dropdown-buttons'
          // disabled={cantSelect}
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            zIndex: 99,
            display: isShow ? "block" : "none",
            color: color?.white,
          }}
          styles={{
            months: { backgroundColor: color?.black },
            cell: { border: 0 },
          }}
          modifiersStyles={{
            selected: { backgroundColor: color.blue },
            today: {
              textDecoration: "underLine",
              textUnderlineOffset: ".3rem",
            },
          }}
        />
      </div>
    </div>
  );
};
