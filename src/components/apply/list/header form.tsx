import { useForm, Controller, useWatch } from "react-hook-form";
import { MySelect } from "@components/form/select";
import api from "@api";
import { useState } from "react";
import { useTheme } from "styled-components";
import { DayPicker } from "react-day-picker";
import { useAppSelector } from "@/hooks/redux";
import { isValid } from "date-fns";
import { timeFormat } from "d3";

interface propsType {
  className?: string;
}
export const HeaderForm = ({ className }: propsType) => {
  const color = useTheme()?.color;
  const timeData = useAppSelector((state) => state.time);
  const { register, handleSubmit, control, setValue } = useForm({
    // shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      dept: "",
      EmpId: "",
      formStatus: "",
      date: {
        start: "",
        end: "",
      },
    },
  });

  function onSubmit(d: any) {
    console.log(d);
  }

  const dept = useWatch({
    name: "dept",
    control,
  });

  console.count("rendered");

  async function getDeptOptions() {
    const res = await api.getDept();

    return res.map((i: { DeptName: string; DeptId: string }) => {
      return {
        label: i.DeptName,
        value: i.DeptId,
      };
    });
  }

  async function getMemberOptions() {
    const res = await api.getMember("", dept);

    // sb(
    return res.map((i: { EmpName: string; EmpId: string }) => {
      return {
        label: i.EmpName,
        value: i.EmpId,
      };
    });
    // );
  }

  const formStatusOptions = [
    { label: "已簽核", value: "succeeded" },
    { label: "未簽核", value: "pending" },
    { label: "作廢", value: "failed" },
  ];

  function getTime(d: Date | undefined) {
    if (!isValid(d)) {
      return "";
    }
    const date = timeFormat("%Y-%m-%d")(d as Date);

    return date;
  }

  interface dateType {
    from: Date | string | undefined;
    to: Date | string | undefined;
  }
  const [range, setRange] = useState<dateType | undefined>({
    from: "",
    to: "",
  });
  const [month, setMonth] = useState<Date>();
  const [isShow, setShow] = useState<boolean>(false);

  const Footer = () => {
    const goToday = () => {
      setMonth(new Date(timeData.today));
      //   handleSelected(new Date(timeData.today));
    };
    return (
      <span
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
          select 2 day
        </p>
        <button
          type='button'
          onClick={goToday}
        >
          Today
        </button>
      </span>
    );
  };

  function handleSelect(d: dateType) {
    console.log(d);
    setRange(d);

    if (isValid(d?.from) && isValid(d?.to)) {
      setValue("date", {
        start: getTime(d.from as Date),
        end: getTime(d.to as Date),
      });
      setShow(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: color.headForm_bgc }}
        className={`${className} flex rounded-xl px-16 py-4`}
      >
        <div className='form-body w-full'>
          <div>
            <label>申請人員</label>
            <Controller
              control={control}
              name='dept'
              render={({ field: { onChange } }) => (
                <MySelect.Async
                  options={getDeptOptions}
                  onChange={onChange}
                  placeholder='選擇部門'
                />
              )}
            />
            <Controller
              control={control}
              name='EmpId'
              render={({ field: { onChange } }) => (
                <MySelect.Async
                  options={getMemberOptions}
                  onChange={onChange}
                  placeholder='選擇業務'
                />
              )}
            />
          </div>
          <div>
            <label>表單狀態</label>
            <Controller
              control={control}
              name='formStatus'
              render={({ field: { onChange } }) => (
                <MySelect.Normal
                  options={formStatusOptions}
                  onChange={onChange}
                  placeholder='選擇狀態'
                  clear
                />
              )}
            />
          </div>
          <div>
            <label>出差日期</label>
            <span className='relative'>
              <input
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
              <span>~</span>
              <input
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
                {...register("date.end")}
                placeholder='結束日期'
              />
              <DayPicker
                mode='range'
                footer={<Footer />}
                selected={range as any}
                onSelect={handleSelect as any}
                fromYear={2022}
                toYear={+timeData.thisYear + 1}
                month={month}
                onMonthChange={setMonth}
                captionLayout='dropdown-buttons'
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
              />
            </span>
          </div>
        </div>

        <button
          type='submit'
          className='w-20 p-0'
        >
          查詢表單
        </button>
      </form>
    </>
  );
};
