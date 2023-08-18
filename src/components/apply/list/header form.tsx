import { useForm, Controller, useWatch } from "react-hook-form";
import { MySelect } from "@components/form/select";
import { useState } from "react";
import { useTheme } from "styled-components";
import {
  DateRange,
  DayPicker,
  SelectRangeEventHandler,
} from "react-day-picker";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { isValid } from "date-fns";
import * as Icons from "@components/UI/icons";
import { useOptions } from "@/hooks/options";
import { setProps } from "@/data/reducers/apply list/apply list";
import { setListData } from "@/data/actions/apply list/set data";
import * as Btns from "@components/UI/buttons";
import { useTranslation } from "react-i18next";
import { useId2name } from "@/hooks/id2name";
import { dateFormatter } from "@/hooks/dateFormatter";
import { memberResType } from "@/lib/api/member/getMember";

export const HeaderForm = ({ className }: propsType) => {
  const color = useTheme()?.color;
  const timeData = useAppSelector((state) => state.time);
  const nowUser = useAppSelector((state) => state.nowUser).body;
  const { i18n, t } = useTranslation(["list page", "common"]);
  const nowLang = i18n.language;

  const { register, handleSubmit, control, setValue } = useForm({
    shouldUnregister: true,
    criteriaMode: "all",
    mode: "onChange",
    defaultValues: {
      dept: "",
      EmpId: nowUser.EmpId,
      formStatus: "",
      date: {
        start: "",
        end: "",
      },
    },
  });

  const watch_dept = useWatch({
    name: "dept",
    control,
  });

  const [range, setRange] = useState<dateType | undefined>({
    from: "",
    to: "",
  });
  const [month, setMonth] = useState<Date>();
  const [isShow, setShow] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  function onSubmit<T>(d: T) {
    // console.log(d);
    dispatch(setProps(d));
    dispatch(setListData(d));
  }

  const { options } = useOptions();
  const { splitName } = useId2name();

  const Footer = () => {
    function goToday() {
      setMonth(new Date(timeData.today));
      //   handleSelected(new Date(timeData.today));
    }
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
    // console.log(d);
    setRange(d);

    if (isValid(d?.from) && isValid(d?.to)) {
      setValue("date", {
        start: dateFormatter(d.from as Date),
        end: dateFormatter(d.to as Date),
      });
      setShow(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: color.headForm_bgc }}
        className={`${className} flex flex-col items-center gap-4 rounded-xl px-16 py-4 md:flex-row`}
      >
        <div className='form-body grid w-full gap-4'>
          <div className='member label-input'>
            <label>{t("label.member")}</label>
            <div className='flex w-full flex-col gap-2 sm:flex-row'>
              <Controller
                control={control}
                name='dept'
                render={({ field: { onChange } }) => (
                  <MySelect.Async
                    options={options.dept}
                    onChange={onChange}
                    placeholder={t("placeholder.dept")}
                    getLabelFunction={(option: memberResType) => {
                      if (nowLang === "en") {
                        return option.DeptName_E;
                      }
                      return option.DeptName;
                    }}
                    getValueFunction={(option: memberResType) => option.DeptId}
                    value='DeptId'
                  />
                )}
              />
              <Controller
                control={control}
                name='EmpId'
                render={({ field: { onChange } }) => (
                  <MySelect.Async
                    options={options.member}
                    onChange={onChange}
                    placeholder={t("placeholder.emp")}
                    getLabelFunction={(option: memberResType) =>
                      splitName(option)
                    }
                    getValueFunction={(option: memberResType) => option.EmpId}
                    value='EmpId'
                    filterFunction={(candidate: { data: memberResType }) => {
                      if (candidate.data.DeptId === watch_dept) {
                        return true;
                      }
                      return false;
                    }}
                  />
                )}
              />
            </div>
          </div>
          <div className='status label-input'>
            <label>{t("label.status")}</label>
            <Controller
              control={control}
              name='formStatus'
              render={({ field: { onChange } }) => (
                <MySelect.Normal
                  options={options.status}
                  onChange={onChange}
                  placeholder={t("placeholder.status")}
                />
              )}
            />
          </div>
          <div className='date label-input'>
            <label>{t("label.date")}</label>
            <span className='relative flex w-full flex-col items-center gap-2 sm:flex-row'>
              <input
                className='w-full'
                style={{
                  cursor: "pointer",
                  backgroundColor: color?.white,
                  color: color?.black,
                }}
                autoComplete='off'
                value={dateFormatter(range?.from as Date)}
                onClickCapture={() => {
                  setShow((prev) => !prev);
                }}
                readOnly
                placeholder={t("placeholder.startDate")}
              />
              <span className='hidden sm:inline-block'>~</span>
              <input
                className='w-full'
                style={{
                  cursor: "pointer",
                  backgroundColor: color?.white,
                  color: color?.black,
                }}
                autoComplete='off'
                value={dateFormatter(range?.to as Date)}
                onClickCapture={() => {
                  setShow((prev) => !prev);
                }}
                readOnly
                {...register("date.end")}
                placeholder={t("placeholder.endDate")}
              />
              <DayPicker
                mode='range'
                footer={<Footer />}
                selected={range as DateRange}
                onSelect={handleSelect as SelectRangeEventHandler}
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
                modifiersStyles={{
                  selected: { backgroundColor: color.blue },
                }}
              />
            </span>
          </div>
        </div>
        <button
          type='submit'
          className='p-0'
        >
          <Btns.IconBtn
            icon={
              <Icons.Search
                color={color.white}
                size='1.5rem'
              />
            }
            style={{
              backgroundColor: color.sectionHeader,
              color: color.white,
            }}
          >
            {t("search")}
          </Btns.IconBtn>
        </button>
      </form>
    </>
  );
};

type propsType = {
  className?: string;
};

interface dateType {
  from: Date | string | undefined;
  to: Date | string | undefined;
}
