import { MySelect } from "@/components/form/select";
import { useAppSelector } from "@data/store";
import { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";
import { filterZoneType, RadioBtn } from "./radio";
import { TimePicker } from "./time picker";
import { FilterSubmit } from "./filter submit";
import { useTranslation } from "react-i18next";

const filterForm_schema = z.object({
  EmpId: z.string().optional(),
  month: z.string().optional(),
});

type filterForm = z.infer<typeof filterForm_schema>;

interface props {
  as: "visit" | "order";
}

export function RecentHeader({ as }: props) {
  const { t } = useTranslation(["salesAnalyze"]);
  const salesList = useAppSelector((state) => state.salesList).body;
  const [type, setType] = useState<filterZoneType>("recent");
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

  useEffect(() => {
    const search_month = search.get("month");
    if (!search_month) {
      setType("recent");
    } else {
      setType("cusTime");
    }
  }, [search, setType]);

  useEffect(() => {
    switch (type) {
      case "recent":
        setValue("month", undefined);
        break;
      default:
        break;
    }
  }, [setValue, type]);

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
            <div className='w-full grid grid-cols-1 justify-start items-center sm:grid-cols-2 lg:flex gap-2'>
              <RadioBtn
                as='recent'
                text={
                  as === "visit"
                    ? t("headerFilter.radio.recent.6")
                    : t("headerFilter.radio.recent.12")
                }
                active={type === "recent"}
                setType={setType}
                value='recent'
              />
              <RadioBtn
                as='recent'
                text={t('headerFilter.time.radio.cus')}
                active={type === "cusTime"}
                setType={setType}
                value='cusTime'
              />
              <TimePicker active={type === "cusTime"} />
            </div>
          </label>
          <FilterSubmit disable={isSubmitting} />
        </form>
      </FormProvider>
    </>
  );
}
