import { Table } from "@/components/table/table";
import { useAppSelector } from "@/hooks/redux";
import { timeFormat } from "d3";
import { timeDay, timeMonday } from "d3-time";
import { useTheme } from "styled-components";
import { useData } from "./data";

const Td = ({ data }: any) => {
  const color = useTheme()?.color;
  let bgc;
  switch (data.type) {
    case "拜訪A.T.U.":
      bgc = color.confirmTable.atu;
      break;
    case "拜訪現有客戶":
      bgc = color.confirmTable.old;
      break;
    case "拜訪新客戶":
      bgc = color.confirmTable.new;
      break;
    default:
      bgc = color.white;
      break;
  }
  return <td style={{ backgroundColor: bgc }}>{data.cus}</td>;
};

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

  const dataSet = useData();

  return (
    <>
      <Table title='一週出差計畫表'>
        <table>
          <thead>
            <tr style={{ backgroundColor: color.confirmTable.header }}>
              <th>MON</th>
              <th>TUE</th>
              <th>WED</th>
              <th>THU</th>
              <th>FRI</th>
              <th
                style={{ backgroundColor: color.confirmTable.header_weekend }}
              >
                SAT
              </th>
              <th
                style={{ backgroundColor: color.confirmTable.header_weekend }}
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
          <tbody>
            {dataSet.map((data, index) => (
              <tr key={index}>
                <Td data={data.mon} />
                <Td data={data.tue} />
                <Td data={data.wed} />
                <Td data={data.thu} />
                <Td data={data.fri} />
                <Td data={data.sat} />
                <Td data={data.sun} />
              </tr>
            ))}
          </tbody>
        </table>
      </Table>
    </>
  );
};
