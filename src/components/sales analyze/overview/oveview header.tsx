import { MySelect } from "@/components/form/select";
import { cn } from "@/utils/cn";
import { useAppSelector } from "@data/store";
import { timeFormat } from "d3";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import z from "zod";

const filterForm_schema = z.object({
  EmpId: z.string().optional(),
  month: z.string().optional(),
});

type filterForm = z.infer<typeof filterForm_schema>;

type timeType = "thisYear" | "thisMonth" | "cusTime";
interface radioProps {
  text: string;
  active?: boolean;
  setType: Dispatch<SetStateAction<timeType>>;
  value: timeType;
}
function RadioBtn({ text, active, setType, value }: radioProps) {
  return (
    <label
      className={cn(
        "px-6 py-2 bg-tableBgc_darker rounded-md cursor-pointer text-center",
        {
          "text-myWhite": active,
          "bg-navActive": active,
        }
      )}
    >
      {text}
      <input
        type='radio'
        name='type'
        value={value}
        className='hidden'
        onChange={() => {
          setType(value);
        }}
      />
    </label>
  );
}

interface timePickerProps {
  active: boolean;
}

function TimePicker({ active }: timePickerProps) {
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
      const fromMonth = obj.from.getMonth() + 1;
      const toMonth = obj.to.getMonth() + 1;
      return `2023 - ${fromMonth}月 ~ 2023 - ${toMonth}月`;
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
    <label className='label-input w-full'>
      <input
        type='text'
        readOnly
        className={cn("cursor-pointer min-w-[14rem]", {
          hidden: !active,
        })}
        onClick={() => {
          setShow((prev) => !prev);
        }}
        placeholder={active ? "請選擇時間..." : ""}
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

export function OverviewHeader() {
  const salesList = useAppSelector((state) => state.salesList).body;
  const { thisMonth } = useAppSelector((state) => state.time);
  const [type, setType] = useState<timeType>("thisYear");
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
            prev.set(data[0], data[1] as string);
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
          className='p-4 bg-tableBgc rounded-lg border-2 border-slate-300 flex flex-col lg:flex-row gap-4 justify-center'
        >
          <Controller
            control={control}
            name='EmpId'
            render={({ field: { onChange } }) => (
              <label className='label-input w-full'>
                業務
                <MySelect.Normal
                  options={options}
                  // getLabelFunction={(option: memberResType) => option.EmpName}
                  // getValueFunction={(option: memberResType) => option.EmpName}
                  // value='EmpId'
                  onChange={onChange}
                />
              </label>
            )}
          />
          <label className='label-input w-full'>
            時間
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:flex gap-2'>
              <RadioBtn
                text='本年度'
                active={type === "thisYear"}
                setType={setType}
                value='thisYear'
              />
              <RadioBtn
                text='本月'
                active={type === "thisMonth"}
                setType={setType}
                value='thisMonth'
              />
              <RadioBtn
                text='選擇區間'
                active={type === "cusTime"}
                setType={setType}
                value='cusTime'
              />
              <TimePicker active={type === "cusTime"} />
            </div>
          </label>
          <input
            type='submit'
            value='Search'
            className=' bg-sectionHeader text-myWhite px-6 py-2 rounded-md cursor-pointer'
            disabled={isSubmitting}
          />
        </form>
      </FormProvider>
    </>
  );
}
