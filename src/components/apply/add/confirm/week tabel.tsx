import { Table } from "@/components/table/table";
import { useTheme } from "styled-components";
import { useEffect, useState } from "react";
import { dataForTable } from "./data";
import { tripEvent } from "@/types";

const Td = ({ data }: { data: any }) => {
  const color = useTheme()?.color;
  const type = data?.data.purpose;
  let bgc;
  switch (type) {
    case tripEvent.atu:
      bgc = color.confirmTable.atu;
      break;
    case tripEvent.oldCus:
      bgc = color.confirmTable.old;
      break;
    case tripEvent.newCus:
      bgc = color.confirmTable.new;
      break;
    default:
      bgc = color.white;
  }

  return <td style={{ backgroundColor: bgc }}>{data?.data.cus}</td>;
};

export const WeekTable = ({ data }: { data: dataForTable }) => {
  const color = useTheme()?.color;

  const { rows, nextWeekDays } = data;
  const [hasData, setHasData] = useState<boolean>(false);
  useEffect(() => {
    if (rows.length === 0) {
      setHasData(false);
    } else {
      setHasData(true);
    }
  }, [rows]);

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
            {hasData ? (
              rows.map((row, index) => {
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
              })
            ) : (
              <tr>
                <td colSpan={7}>no data</td>
              </tr>
            )}
          </tbody>
        </table>
      </Table>
    </>
  );
};
