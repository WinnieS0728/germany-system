import { memberResType } from "@/api/member/getMember";
import { MySelect } from "@/components/form/select";
import { Month_MM } from "@/const";
import { cn } from "@/utils/cn";
import { useAppSelector } from "@/utils/redux";
import { useState } from "react";
import Select from "react-select";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import z from "zod";

type timeType = "year" | "month" | "cusTime";
interface radioProps {
  text: string;
  active?: boolean;
}
function RadioBtn({ text, active }: radioProps) {
  return (
    <>
      <span
        className={cn(
          "px-6 py-2 bg-tableBgc_darker rounded-md cursor-pointer",
          {
            "text-myWhite": active,
            "bg-navActive": active,
          }
        )}
      >
        {text}
      </span>
    </>
  );
}
interface timePickerProps {
  type: timeType;
}

function TimePicker({ type }: timePickerProps) {
  const { thisYear } = useAppSelector((state) => state.time);
  const { control } = useFormContext();

  function Year() {
    const yearArray: string[] = [];
    for (let i = 2021; i <= Number(thisYear); i++) {
      yearArray.push(String(i));
    }
    return (
      <>
        <Controller
          control={control}
          name='year'
          render={({ field: { onChange } }) => (
            <MySelect.Normal
              options={yearArray.map((year) => ({ label: year, value: year }))}
              onChange={onChange}
            />
          )}
        />
      </>
    );
  }
  function Month() {
    const monthArray = Month_MM.map((month) => ({
      label: `${Number(month)} 月`,
      value: month,
    }));
    return (
      <>
        <Controller
          control={control}
          name='month'
          render={({ field: { onChange } }) => (
            <MySelect.Normal
              options={monthArray}
              onChange={onChange}
            />
          )}
        />
      </>
    );
  }
  function CusTime() {
    return <></>;
  }

  return (
    <div className='w-full flex gap-2'>
      {(type === "year" || type === "month") && (
        <>
          <Year />
          {type === "month" && <Month />}
        </>
      )}
      {type === "cusTime" && <CusTime />}
    </div>
  );
}

const timePicker_schema = z.object({
  EmpId: z.string(),
  year: z.string().optional(),
  month: z.string().optional(),
});

type timePicker = z.infer<typeof timePicker_schema>;

export function OverviewHeader() {
  const salesList = useAppSelector((state) => state.salesList).body;
  const [type, setType] = useState<timeType>("year");
  const methods = useForm<timePicker>({
    shouldUnregister: false,
  });
  const { handleSubmit, control } = methods;
  function onSubmit(data: timePicker) {
    console.log(data);
  }
  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='p-4 bg-tableBgc rounded-lg border-2 border-slate-300 flex gap-16 justify-center'
        >
          <Controller
            control={control}
            name='EmpId'
            render={({ field: { onChange } }) => (
              <label className='label-input w-full'>
                業務
                <MySelect.Normal
                  options={salesList}
                  getLabelFunction={(option: memberResType) => option.EmpName}
                  getValueFunction={(option: memberResType) => option.EmpName}
                  value="EmpId"
                  onChange={onChange}
                />
              </label>
            )}
          />
          <label className='label-input gap-2'>
            時間
            <label>
              <RadioBtn
                text='年'
                active={type === "year"}
              />
              <input
                type='radio'
                name='type'
                value={"year"}
                className='hidden'
                onChange={() => {
                  setType("year");
                }}
              />
            </label>
            <label>
              <RadioBtn
                text='月'
                active={type === "month"}
              />
              <input
                type='radio'
                name='type'
                value={"month"}
                className='hidden'
                onChange={() => {
                  setType("month");
                }}
              />
            </label>
            <label>
              <RadioBtn
                text='區間'
                active={type === "cusTime"}
              />
              <input
                type='radio'
                name='type'
                value={"cusTime"}
                className='hidden'
                onChange={() => {
                  setType("cusTime");
                }}
              />
            </label>
          </label>
          <TimePicker type={type} />
          <input
            type='submit'
            value='Search'
            className=' bg-sectionHeader text-myWhite px-6 rounded-md'
          />
        </form>
      </FormProvider>
    </>
  );
}
