import { useAppSelector } from "@/hooks/redux";
import { timeFormat } from "d3";
import { timeDay, timeMonday } from "d3-time";

export const useData = () => {
  const tripData = useAppSelector((state) => state.tripDetail);

  function getTime(d: Date) {
    return timeFormat("%Y-%m-%d")(d);
  }

  const getNextWeekDays = () => {
    const nextWeekDate = [];
    for (let d = 0; d < 7; d++) {
      nextWeekDate.push(getTime(timeDay.offset(timeMonday(new Date()), d + 7)));
    }
    return nextWeekDate;
  };

  const totalData = tripData.body
    .map((i) => spread(i))
    .reduce((a, b) => a.concat(b), [])
    .sort((a, b) => new Date(a.date[0]).getTime() - new Date(b.date[0]).getTime());

  function dateFormatter(d: Date | string): string {
    if (typeof d === "string") {
      return d;
    } else {
      return timeFormat("%Y-%m-%d")(d as Date);
    }
  }

  function getDayList(date: { startDate: string; endDate: string }) {
    const dayList = [];
    const days =
      timeDay.count(new Date(date.startDate), new Date(date.endDate)) + 1;
    for (let n = 0; n < days; n++) {
      dayList.push(dateFormatter(timeDay.offset(new Date(date.startDate), n)));
    }
    return dayList;
  }

  function spread(obj: any) {
    const index = obj.data.length;
    const data = [];
    for (let i = 0; i < index; i++) {
      data.push({
        ...obj,
        date: getDayList(obj.date),
        data: obj.data[i],
      });
    }
    return data;
  }

  const dataInThisWeek = getNextWeekDays().map((day) => {
    return totalData.filter((data) => data.date.some((i: string) => i === day));
    // .sort((a, b) => b.date.length - a.date.length);
  });

  // console.log(dataInThisWeek);

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
    const data = dataInThisWeek.map((data) => data[n]);

    return data;
  }

  const tableRows = [];
  for (let num = 0; num < maxRow; num++) {
    tableRows.push(newRow(num));
  }

  // console.log(tableRows);

  return {
    nextWeekDays: getNextWeekDays(),
    rows: tableRows,
    spreadData: totalData,
  };
};
