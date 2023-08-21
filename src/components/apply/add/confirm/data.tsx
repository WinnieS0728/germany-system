import {
  detailDataType,
  detailDataWithSingleData,
  detailData_date,
} from "@/data/reducers/trip detail/trip detail";
import { dateFormatter } from "@/hooks/dateFormatter";
import { timeFormat } from "d3";
import { timeDay, timeMonday } from "d3-time";

export interface dataForTable {
  nextWeekDays: string[];
  rows: (detailDataWithSingleData | undefined)[][];
  spreadData: detailDataWithSingleData[];
}
export const useTripDataProcessing = (
  data: detailDataType[],
  date: string
): dataForTable => {
  function getTime(d: Date) {
    return timeFormat("%Y-%m-%d")(d);
  }

  const getNextWeekDays = () => {
    const nextWeekDate = [];
    for (let d = 0; d < 7; d++) {
      nextWeekDate.push(
        getTime(timeDay.offset(timeMonday(new Date(date)), d + 7))
      );
    }
    return nextWeekDate;
  };

  const totalData = data
    .map((i) => spread(i))
    .reduce((a, b) => a.concat(b), [])
    .sort(
      (a, b) => new Date(a.date[0]).getTime() - new Date(b.date[0]).getTime()
    );

  function getDayList(date: { startDate: string; endDate: string }) {
    const dayList = [];
    const days =
      timeDay.count(new Date(date.startDate), new Date(date.endDate)) + 1;
    for (let n = 0; n < days; n++) {
      dayList.push(dateFormatter(timeDay.offset(new Date(date.startDate), n)));
    }
    return dayList;
  }

  function spread(obj: detailDataType): detailDataWithSingleData[] {
    const index = obj.data.length;
    const data = [];
    for (let i = 0; i < index; i++) {
      data.push({
        ...obj,
        date: getDayList(obj.date as detailData_date),
        data: { ...obj.data[i], eventId: obj.data[i].purpose },
      });
    }
    return data;
  }

  const dataInThisWeek = getNextWeekDays().map((day) => {
    return totalData
      .filter((data) => data.date.some((i: string) => i === day))
      .sort((a, b) => b.date.length - a.date.length);
  });

  const maxRow = Math.max(
    dataInThisWeek[0].length,
    dataInThisWeek[1].length,
    dataInThisWeek[2].length,
    dataInThisWeek[3].length,
    dataInThisWeek[4].length,
    dataInThisWeek[5].length,
    dataInThisWeek[6].length
  );

  function newRow(n: number) {
    const initData = {
      id: 0,
      date: [],
      data: {
        district: "",
        city: "",
        purpose: "",
        eventId: "",
        cus: "",
        hotel: "",
        PS: "",
      },
    };

    const data = dataInThisWeek.map((data) => (data[n] ? data[n] : initData));

    return data;
  }

  const tableRows = [];
  for (let num = 0; num < maxRow; num++) {
    tableRows.push(newRow(num));
  }

  return {
    nextWeekDays: getNextWeekDays(),
    rows: tableRows,
    spreadData: totalData,
  };
};
