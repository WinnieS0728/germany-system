import { MySelect } from "@/components/form/select";
import { useAppSelector } from "@data/store";
import { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";
import { TimePicker } from "./time picker";
import { filterTimeType, RadioBtn } from "./radio";
import { FilterSubmit } from "./filter submit";

const filterForm_schema = z.object({
  EmpId: z.string().optional(),
  month: z.string().optional(),
});

type filterForm = z.infer<typeof filterForm_schema>;

export function OverviewHeader() {
  const salesList = useAppSelector((state) => state.salesList).body;
  const { thisMonth } = useAppSelector((state) => state.time);
  const [type, setType] = useState<filterTimeType>("thisYear");
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
      setType("thisYear");
    } else if (search_month.includes("_")) {
      setType("cusTime");
    } else {
      setType("thisMonth");
    }
  }, [search, setType]);

  useEffect(() => {
    switch (type) {
      case "thisYear":
        setValue("month", undefined);
        break;
      case "thisMonth":
        setValue("month", thisMonth);
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
                <p>業務</p>
                <MySelect.Normal
                  options={options}
                  onChange={onChange}
                />
              </label>
            )}
          />
          <label className='label-input w-full'>
            <p>時間</p>
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2'>
              <RadioBtn
                as='time'
                text='本年度'
                active={type === "thisYear"}
                setType={setType}
                value='thisYear'
              />
              <RadioBtn
                as='time'
                text='本月'
                active={type === "thisMonth"}
                setType={setType}
                value='thisMonth'
              />
              <RadioBtn
                as='time'
                text='選擇區間'
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
