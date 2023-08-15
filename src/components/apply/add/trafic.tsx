import { Required } from "@/components/form/required";
import { useOptions } from "@/hooks/options";
import { useAppSelector } from "@/hooks/redux";
import { useSelectRef } from "@/hooks/select ref";
import { MySelect } from "@components/form/select";
import { timeDay } from "d3-time";
import { useEffect, useMemo } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface date {
  startDate: string;
  endDate: string;
}
export const TransportationForm = () => {
  const { i18n, t } = useTranslation("new form", { keyPrefix: "transport" });
  const nowLang = i18n.language;
  const { options } = useOptions();

  const { register, control, setValue } = useFormContext();
  const watch_date: date[] = useWatch({
    name: "tripData",
    control,
    defaultValue: [],
  });

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
        const days = getDays(watch_date[index]) - 1;
        return days > 0 ? days : 0;
      }
    });
    const stayDay = stayDayList.reduce((a, b) => a + b, 0);

    return {
      isStay: isStay,
      day: stayDay,
    };
  }, [watch_date, stayList]);

  useEffect(() => {
    setValue("IsLodging", stayDays.isStay);
    setValue("StayDays", stayDays.day);
  }, [stayDays, setValue]);

  const outDays = useMemo(() => {
    if (watch_date.length === 0) {
      return 0;
    }
    const dayList = watch_date
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
  }, [watch_date]);

  useEffect(() => {
    setValue("Days", outDays);
  }, [outDays, setValue]);

  return (
    <fieldset className='space-y-2'>
      <div className='transportation label-input'>
        <label>
          <Required />
          {t("transportation")} :
        </label>
        <Controller
          control={control}
          name='Transport'
          render={({ field: { onChange } }) => (
            <MySelect.Async
              forwardRef={newFormRef.transport}
              options={options.transport}
              onChange={onChange}
              getLabelFunction={(option: any) => {
                if (nowLang === "en") {
                  return option.ResourcesName_E;
                }
                return option.ResourcesName;
              }}
              getValueFunction={(option: any) => option.ResourcesId}
              value='ResourcesId'
              placeholder={t("placeholder.transportation")}
            />
          )}
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3'>
        <div className='stay label-input justify-start'>
          <label>{t("isStay")} :</label>
          <input
            type='text'
            {...register("IsLodging")}
            autoComplete='off'
            className='noBorder w-[5em]'
            readOnly
          />
        </div>
        <div className='stayDay label-input justify-start'>
          <label>{t("stayDay")} :</label>
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
        <div className='totalDay label-input justify-start'>
          <label>{t("tripDay")} :</label>
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
