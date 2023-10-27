import { Required } from "@/components/form/required";
import { useOptions } from "@/hooks/useOptions";
import { useSelectRef } from "@/hooks/select ref";
import { trafficEvent } from "@/api/event/get event";
import { MySelect } from "@components/form/select";
import { timeDay } from "d3-time";
import { BaseSyntheticEvent, useEffect, useMemo, useState } from "react";
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
  const { newFormRef } = useSelectRef();
  const [stayDay, setStayDay] = useState<number | string>(0);

  const { register, control, setValue } = useFormContext();
  const watch_date: date[] = useWatch({
    name: "tripData",
    control,
    defaultValue: [],
  });

  const watch_isLodging = useWatch({
    name: "IsLodging",
    control,
  });

  useEffect(() => {
    if (watch_isLodging === "No") {
      setValue("StayDays", 0);
      setStayDay(0);
    }
  }, [setValue, watch_isLodging]);

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

  function onlyNumberFilter(e: BaseSyntheticEvent) {
    const input = e.target.value;
    const value = input.replace(/[^0-9]/gi, "");
    setStayDay(value);
  }
  return (
    <fieldset className='space-y-2'>
      <div className='transportation'>
        <label className='label-input'>
          <p>
            <Required />
            {t("transportation")} :
          </p>
          <Controller
            control={control}
            name='Transport'
            render={({ field: { onChange } }) => (
              <MySelect.Async
                forwardRef={newFormRef.transport}
                options={options.transport}
                onChange={onChange}
                getLabelFunction={(option: trafficEvent) => {
                  if (nowLang === "en") {
                    return option.ResourcesName_E;
                  }
                  return option.ResourcesName;
                }}
                getValueFunction={(option: trafficEvent) => option.ResourcesId}
                value='ResourcesId'
                placeholder={t("placeholder.transportation")}
                multi
                autoClose={false}
              />
            )}
          />
        </label>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3'>
        <div className='stay flex items-center justify-start'>
          <label className='label-input'>
            <p>{t("isStay")} :</p>
            <div className='flex gap-4'>
              <label className='label-input'>
                <input
                  type='radio'
                  {...register("IsLodging")}
                  value={"Yes"}
                />
                <p>Yes</p>
              </label>
              <label className='label-input'>
                <input
                  type='radio'
                  {...register("IsLodging")}
                  value={"No"}
                />
                <p>No</p>
              </label>
            </div>
          </label>
        </div>
        <div className='stayDay  justify-start'>
          <label className='label-input'>
            <p>{t("stayDay")} :</p>
            <input
              type='text'
              {...register("StayDays", {
                valueAsNumber: true,
              })}
              autoComplete='off'
              className='!w-[5em]'
              onFocus={() => {
                setStayDay("");
              }}
              onBlur={() => {
                if (stayDay === "") {
                  setStayDay(0);
                }
              }}
              value={stayDay}
              onChangeCapture={onlyNumberFilter}
              disabled={watch_isLodging === "No"}
            />
          </label>
        </div>
        <div className='totalDay  justify-start'>
          <label className='label-input'>
            <p>{t("tripDay")} :</p>
            <input
              type='text'
              {...register("Days", {
                valueAsNumber: true,
              })}
              autoComplete='off'
              readOnly
              className='noBorder w-[5em]'
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
};
