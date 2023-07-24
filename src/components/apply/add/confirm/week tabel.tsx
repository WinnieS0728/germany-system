import { Table } from "@/components/table/table";
import { useTheme } from "styled-components";
import { useData } from "./data";

const Td = ({ data }: { data: any }) => {
  const color = useTheme()?.color;
  const type = data?.data.purpose;
  let bgc;
  switch (type) {
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
  }

  return (
    <td
      style={{ backgroundColor: bgc }}
    >
      {data?.data.cus}
    </td>
  );
};

export const WeekTable = () => {
  const color = useTheme()?.color;

  const { rows, nextWeekDays } = useData();

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
            {rows.map((row, index) => {
              return (
                <tr key={index}>
                  {row.map((r, i) => (
                    <Td
                      key={i}
                      data={r}
                    />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </Table>
    </>
  );
};
