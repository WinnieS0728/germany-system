import { useAppSelector } from "@/data/store";
import { month_shortName } from "@/types";
import { cn } from "@/utils/cn";
import { timeFormat } from "d3";
import { useState, useEffect } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface timePickerProps {
  active: boolean;
}

export function TimePicker({ active }: timePickerProps) {
  const {
    t,
    i18n: { language: nowLang },
  } = useTranslation(["salesAnalyze"]);
  const { setValue } = useFormContext();
  const { thisYear } = useAppSelector((state) => state.time);
  const [range, setRange] = useState<DateRange>();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (!active) {
      setValue("month", undefined);
      setShow(false);
    }
  }, [active, setValue]);

  useEffect(() => {
    if (range && range.from && range.to) {
      setValue("month", getMonth(range));
      setShow(false);
    }

    function getMonth(obj: DateRange): string {
      if (obj.from && obj.to) {
        const startMonth = timeFormat("%m")(obj.from);
        const endMonth = timeFormat("%m")(obj.to);
        return `${startMonth}_${endMonth}`;
      }
      return "";
    }
  }, [range, setValue]);

  function getInputValue(obj: DateRange | undefined): string {
    if (obj && obj.from && obj.to) {
      const fromMonth = obj.from.getMonth();
      const toMonth = obj.to.getMonth();
      if (nowLang === 'zh') { 
        return `2023 - ${fromMonth+1}月 ~ 2023 - ${toMonth+1}月`;
      }else {
        return `2023 - ${month_shortName.at(fromMonth)} ~ 2023 - ${month_shortName.at(toMonth)}`
      }
    }
    return "";
  }

  function Footer() {
    return (
      <>
        <button
          type='button'
          onClick={() => {
            setRange(undefined);
            setValue("month", undefined);
          }}
        >
          clear
        </button>
      </>
    );
  }

  return (
    <label
      className={cn("label-input w-full", {
        hidden: !active,
      })}
    >
      <input
        type='text'
        readOnly
        className={cn("cursor-pointer min-w-[14rem]")}
        onClick={() => {
          setShow((prev) => !prev);
        }}
        placeholder={active ? t('headerFilter.dayPicker.placeholder') : ""}
        disabled={!active}
        value={getInputValue(range)}
        autoComplete='off'
      />
      {show && (
        <DayPicker
          mode='range'
          captionLayout='dropdown-buttons'
          className={cn("absolute top-full -left-10 z-10", {
            hidden: !show,
          })}
          fromYear={Number(thisYear)}
          toYear={Number(thisYear)}
          selected={range}
          onSelect={setRange}
          footer={<Footer />}
          styles={{
            root: {
              backgroundColor: "white",
              padding: "0.5rem",
              border: "2px solid black",
              borderRadius: "8px",
            },
          }}
          modifiersClassNames={{
            selected: "bg-navActive",
            today: "text-xl underline underline-offset-4",
          }}
        />
      )}
    </label>
  );
}
