import { MySelect } from "@/components/form/select";
import { useAppSelector } from "@data/store";
import { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";
import { filterTimeType, RadioBtn } from "./radio";
import { FilterSubmit } from "./filter submit";
import { useTranslation } from "react-i18next";
import { month_shortName } from "@/types";

const filterForm_schema = z.object({
  EmpId: z.string().optional(),
  month: z.string().optional(),
});

type filterForm = z.infer<typeof filterForm_schema>;

export function KpiAchievementHeader() {
  const {
    t,
    i18n: { language: nowLang },
  } = useTranslation(["salesAnalyze"]);
  const salesList = useAppSelector((state) => state.salesList).body;
  const { thisMonth } = useAppSelector((state) => state.time);
  const [type, setType] = useState<filterTimeType>("thisMonth");
  const [search, setSearch] = useSearchParams();
  const methods = useForm<filterForm>({
    shouldUnregister: false,
    defaultValues: {
      EmpId: undefined,
      month: undefined,
    },
  });
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = methods;

  type options = {
    label: string;
    value: string | undefined;
  };

  const options = useMemo(() => {
    const emptyOption: options = { label: "all", value: undefined };
    const restOption: options[] = salesList.map((data) => ({
      label: data.EmpName,
      value: data.EmpId,
    }));
    return [emptyOption].concat(restOption);
  }, [salesList]);

  const monthOption = useMemo(() => {
    const monthArray: string[] = [];
    for (let month = 1; month <= Number(thisMonth); month++) {
      monthArray.push(month < 10 ? `0${month}` : String(month));
    }

    const options = monthArray.map((month) => ({
      label:
        nowLang === "en"
          ? month_shortName.at(Number(month) - 1)
          : `${Number(month)}月`,
      value: month,
    }));

    return options;
  }, [nowLang, thisMonth]);

  useEffect(() => {
    const search_month = search.get("month");
    if (!search_month) {
      setType("thisMonth");
    } else {
      setType("cusTime");
    }
  }, [search, setType]);

  useEffect(() => {
    switch (type) {
      case "thisMonth":
        setValue("month", undefined);
        break;
      default:
        break;
    }
  }, [setValue, thisMonth, type]);
  function onSubmit(data: filterForm) {
    const dataArray = Object.entries(data);
    for (const data of dataArray) {
      setSearch(
        (prev) => {
          prev.delete(data[0]);
          return prev;
        },
        { replace: true }
      );
      if (data[1]) {
        setSearch(
          (prev) => {
            prev.append(data[0], data[1] as string);
            return prev;
          },
          { replace: true }
        );
      }
    }
  }
  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='headerFilter'
        >
          <Controller
            control={control}
            name='EmpId'
            render={({ field: { onChange } }) => (
              <label className='label-input w-full'>
                <p>{t("headerFilter.sales")}</p>
                <MySelect.Normal
                  options={options}
                  onChange={onChange}
                />
              </label>
            )}
          />
          <label className='label-input w-full'>
            <p>{t("headerFilter.time.label")}</p>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2'>
              <RadioBtn
                as='time'
                text={t("headerFilter.time.radio.thisMonth")}
                active={type === "thisMonth"}
                setType={setType}
                value='thisMonth'
              />
              <RadioBtn
                as='time'
                text={t("headerFilter.radio.selectMonth")}
                active={type === "cusTime"}
                setType={setType}
                value='cusTime'
              />
              {type === "cusTime" && (
                <Controller
                  control={control}
                  name='month'
                  render={({ field: { onChange } }) => (
                    <label className='label-input'>
                      <MySelect.Normal
                        options={monthOption}
                        onChange={onChange}
                      />
                    </label>
                  )}
                />
              )}
            </div>
          </label>
          <FilterSubmit disable={isSubmitting} />
        </form>
      </FormProvider>
    </>
  );
}
