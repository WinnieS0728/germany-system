import { detailDataWithSingleData } from "@/data/reducers/trip detail/trip detail";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeDay, timeMonday } from "d3";
import { dataForTable } from "@/components/apply/add/confirm/data";

export const useTableData = (
  data: detailDataWithSingleData[][],
  date: string
): dataForTable => {
  const getNextWeekDays = () => {
    const nextWeekDate = [];
    for (let d = 0; d < 7; d++) {
      nextWeekDate.push(
        dateFormatter(timeDay.offset(timeMonday(new Date(date)), d + 7))
      );
    }
    return nextWeekDate;
  };
  const totalData = data.reduce((a, b) => a.concat(b), []);
  
  const dataInThisWeek = getNextWeekDays().map((date) =>
    totalData
      .filter((d) => d.date.some((s) => s === date))
      .sort((a, b) => b.date.length - a.date.length)
  );

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
    const initData: detailDataWithSingleData = {
      id: 0,
      date: [],
      data: {
        district: "",
        city: "",
        purpose: "",
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
