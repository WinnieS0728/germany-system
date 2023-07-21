import { Table } from "@/components/table/table";
import { useAppSelector } from "@/hooks/redux";
import { timeFormat } from "d3";
import { timeDay, timeMonday } from "d3-time";
import { useTheme } from "styled-components";
import { useData } from "./data";

export const WeekTable = () => {
  const color = useTheme()?.color;
  const timeData = useAppSelector((state) => state.time);
  const nextMonday = timeDay.offset(timeMonday(new Date(timeData.today)), 7);
  function getTime(date: Date): string {
    return timeFormat("%Y-%m-%d")(date);
  }
  const nextWeekDays = [];
  for (let t = 0; t < 7; t++) {
    const day = getTime(timeDay.offset(nextMonday, t));
    nextWeekDays.push(day);
  }
  //   console.log(nextWeekDays);

  const dataSet = useData()  

  return (
    <>
      <Table title='一週出差計畫表'>
        <table>
          <thead>
            <tr style={{ backgroundColor: color.confirmTable_header }}>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th
                style={{ backgroundColor: color.confirmTable_header_holiday }}
              >
                SAT
              </th>
              <th
                style={{ backgroundColor: color.confirmTable_header_holiday }}
              >
                SUN
              </th>
            </tr>
            <tr style={{ backgroundColor: color.white }}>
              {nextWeekDays.map((day, index) => (
                <td
                  key={index}
                  style={{ whiteSpace: "nowrap" }}
                >
                  {day}
                </td>
              ))}
            </tr>
          </thead>
        </table>
      </Table>
    </>
  );
};
