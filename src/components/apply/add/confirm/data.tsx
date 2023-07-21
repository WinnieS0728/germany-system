import { useAppSelector } from "@/hooks/redux";
import { timeDay } from "d3-time";

export const useData = () => {
  const tripData = useAppSelector((state) => state.tripDetail);

  function getWeekDay(date: Date): string {
    let day = "";
    const weekIndex = date.getDay();
    switch (weekIndex) {
      case 0:
        day = "sun";
        break;
      case 1:
        day = "mon";
        break;
      case 2:
        day = "tue";
        break;
      case 3:
        day = "wed";
        break;
      case 4:
        day = "thu";
        break;
      case 5:
        day = "fri";
        break;
      case 6:
        day = "sat";
        break;

      default:
        break;
    }
    return day;
  }

  function listAllDays(date: { startDate: string; endDate: string }) {
    if (!date) {
      return [];
    }
    const startDay = date.startDate;
    const days =
      timeDay.count(new Date(date.startDate), new Date(date.endDate)) + 1;
    const dayList = [];
    for (let d = 0; d < days; d++) {
      dayList.push(getWeekDay(timeDay.offset(new Date(startDay), d)));
    }
    return dayList;
  }

  const data = tripData.body.map((i) => {
    const data = i.data.map((i) => {
      return {
        type: i.purpose,
        cus: i.cus,
      };
    });
    return {
      date: listAllDays(i.date),
      data: data,
    };
  });

  function getThisDaysData(dayName: string) {
    const targetData = data.find((d) => d.date.some((w) => w === dayName));

    return targetData ? targetData.data : [];
  }

  const weekData = {
    mon: getThisDaysData("mon"),
    tue: getThisDaysData("tue"),
    wed: getThisDaysData("wed"),
    thu: getThisDaysData("thu"),
    fri: getThisDaysData("fri"),
    sat: getThisDaysData("sat"),
    sun: getThisDaysData("sun"),
  };
  //   console.log(weekData);

  const max = Math.max(
    weekData.mon.length,
    weekData.tue.length,
    weekData.wed.length,
    weekData.thu.length,
    weekData.fri.length,
    weekData.sat.length,
    weekData.sun.length
  );

  const tableRows = [];

  function newRow(index:number) {
    return {
        mon: weekData.mon[index] || {},
        tue: weekData.tue[index] || {},
        wed: weekData.wed[index] || {},
        thu: weekData.thu[index] || {},
        fri: weekData.fri[index] || {},
        sat: weekData.sat[index] || {},
        sun: weekData.sun[index] || {},
    };
  }
  for (let i = 0; i < max; i++) {
    tableRows.push(newRow(i));
  }

  console.log(tableRows);

  return tableRows;
};
