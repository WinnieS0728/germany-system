import { useAppDispatch, useAppSelector } from "@/utils/redux";
import { Table } from "@components/table/table";
import { getWeek, isSunday, isValid } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useTheme } from "styled-components";
import { timeDay, timeMonday, timeSunday } from "d3-time";
import { timeFormat } from "d3";
import { setWeekVisitData } from "@actions/visit data/set week visit";
import { GetData, salesThresholdData } from "./week data";
import { useTranslation } from "react-i18next";
import { thresholdResType } from "@/api/kpi threshold/threshold";

export const WeekTable = () => {
  const { t } = useTranslation(["common", "customRatePage"]);
  const timeData = useAppSelector((state) => state.time);
  const color = useTheme()?.color;
  const [value, setValue] = useState<string>("");
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const [selected, setSelected] = useState<Date>(new Date(timeData.today));

  const Filter = () => {
    const [month, setMonth] = useState<Date>();
    const [isShow, setShow] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const Footer = () => {
      const goToday = () => {
        setMonth(new Date(timeData.today));
        handleSelected(new Date(timeData.today));
      };
      return (
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
            select 1 day
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

    function getTime(inputDate: Date): string {
      return timeFormat("%Y-%m-%d")(inputDate);
    }

    interface dateInfo {
      monday: string;
      sunday: string;
      week: number;
    }

    const getDateInfo = useCallback((d: Date): dateInfo => {
      const prevMonday = getTime(timeMonday(d));

      let nextSunday;
      let week;
      if (isSunday(d as Date)) {
        nextSunday = getTime(d as Date);
        week = getWeek(d as Date) - 1;
      } else {
        const s = timeSunday(d);
        nextSunday = getTime(timeDay.offset(s, 7));
        week = getWeek(d as Date);
      }

      return {
        monday: prevMonday,
        sunday: nextSunday,
        week: week,
      };
    }, []);

    useEffect(() => {
      const m = getDateInfo(selected).monday;
      const s = getDateInfo(selected).sunday;
      const w = getDateInfo(selected).week;

      const value = `${m} - ${s} (w${w})`;
      setValue(value);
      
      if (firstTime === true) {
        dispatch(setWeekVisitData(m));
        setFirstTime(false);
      }
    }, [dispatch, getDateInfo]);

    function handleSelected(d: Date | undefined) {
      if (!isValid(d)) return;
      // console.log(d);
      setSelected(d as Date);
      const m = getDateInfo(d as Date).monday;
      dispatch(setWeekVisitData(m));
    }

    return (
      <>
        <label
          className='relative flex flex-col  items-center gap-2 sm:flex-row'
          id='joy-ratePage-2'
        >
          {t("week table.filter label", { ns: "customRatePage" })} :
          <input
            name={"week"}
            style={{
              cursor: "pointer",
              minWidth: "27ch",
              backgroundColor: color?.white,
              color: color?.black,
            }}
            autoComplete='off'
            value={value}
            onClickCapture={() => {
              setShow((prev) => !prev);
            }}
            readOnly
          />
          <DayPicker
            mode='single'
            footer={<Footer />}
            selected={selected}
            onSelect={handleSelected}
            fromYear={2022}
            toYear={+timeData.thisYear + 1}
            month={month}
            onMonthChange={setMonth}
            captionLayout='dropdown-buttons'
            showWeekNumber
            formatters={{
              formatWeekNumber: (w) => `w${w}`,
            }}
            style={{
              position: "absolute",
              top: "100%",
              right: 0,
              zIndex: 99,
              display: isShow ? "block" : "none",
            }}
            styles={{
              months: { backgroundColor: "black" },
            }}
          />
        </label>
      </>
    );
  };

  const visitData = GetData();
  // console.log(visitData);

  function getPercent(d1: number, d2: number): number {
    const percent = parseInt(((d1 / d2) * 100).toFixed(0));
    return percent ? percent : 0;
  }

  function getKpiThreshold(d: salesThresholdData) {
    const month = selected.toLocaleString("en", {
      month: "short",
    }) as keyof thresholdResType;
    const num = d.threshold?.[month];

    return parseInt(num);
  }

  const thresholdStyle = {
    backgroundColor: color?.threshold_bgc,
  };

  return (
    <Table
      title={t("week table.title", { ns: "customRatePage" })}
      filter={<Filter />}
    >
      <table id='joy-ratePage-3'>
        <thead style={{ color: color?.black }}>
          <tr>
            <td rowSpan={2}>
              {t("week table.thead.sales", { ns: "customRatePage" })}
            </td>
            <td rowSpan={2}>
              {t("week table.thead.total", { ns: "customRatePage" })}
            </td>
            <td colSpan={3}>
              {t("cus type.exist cus", { ns: "customRatePage" })}
            </td>
            <td colSpan={2}>
              {t("cus type.new cus", { ns: "customRatePage" })}
            </td>
            <td
              colSpan={2}
              style={thresholdStyle}
            >
              {t("week table.thead.threshold", { ns: "customRatePage" })}
            </td>
          </tr>
          <tr>
            <td>
              {t("week table.thead.atu number", { ns: "customRatePage" })}
            </td>
            <td>
              {t("week table.thead.tire number", { ns: "customRatePage" })}
            </td>
            <td>{t("week table.thead.rate", { ns: "customRatePage" })}</td>
            <td>
              {t("week table.thead.tire number", { ns: "customRatePage" })}
            </td>
            <td>{t("week table.thead.rate", { ns: "customRatePage" })}</td>
            <td style={thresholdStyle}>
              {t("cus type.exist cus", { ns: "customRatePage" })}
            </td>
            <td style={thresholdStyle}>
              {t("cus type.new cus", { ns: "customRatePage" })}
            </td>
          </tr>
        </thead>
        <tbody>
          {visitData.map((d, index) => {
            const threshold = getKpiThreshold(d);
            const isBad =
              getPercent(d.visitData.newCus, d.visitData.total) > threshold;

            return (
              <tr
                key={index}
                style={{
                  backgroundColor: isBad ? color?.error_table : "transparent",
                }}
              >
                <td>{d.name}</td>
                <td>{d.visitData.total}</td>
                <td>{d.visitData.atu}</td>
                <td>{d.visitData.existCus}</td>
                <td>{getPercent(d.visitData.old, d.visitData.total) + "%"}</td>
                <td>{d.visitData.newCus}</td>
                <td>
                  {getPercent(d.visitData.newCus, d.visitData.total) + "%"}
                </td>
                <td style={thresholdStyle}> {100 - threshold + "%" || 0}</td>
                <td style={thresholdStyle}>{threshold + "%" || 0}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Table>
  );
};
