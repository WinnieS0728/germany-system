import { MySelect } from "@/components/form/select";
import { useAppSelector } from "@data/store";
import { useEffect, useMemo, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";
import { filterZoneType, RadioBtn } from "./radio";
import { TimePicker } from "./time picker";
import { FilterSubmit } from "./filter submit";

const filterForm_schema = z.object({
  EmpId: z.string().optional(),
  month: z.string().optional(),
});

type filterForm = z.infer<typeof filterForm_schema>;

interface props {
  as: "visit" | "order";
}

export function RecentHeader({ as }: props) {
  const salesList = useAppSelector((state) => state.salesList).body;
  const { thisMonth } = useAppSelector((state) => state.time);
  const [type, setType] = useState<filterZoneType>("recent");
  const setSearch = useSearchParams()[1];
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
            <div className='w-full grid grid-cols-1 justify-start items-center sm:grid-cols-2 lg:flex gap-2'>
              <RadioBtn
                as='recent'
                text={as === "visit" ? "最近 6 個月" : "最近 4 個月"}
                active={type === "recent"}
                setType={setType}
                value='recent'
              />
              <RadioBtn
                as='recent'
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
