import { Table } from "@/components/table/table";
import { useData } from "./data";
import { useAppSelector } from "@/hooks/redux";
import api from "@/lib/api";
import { useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";

export const PerCentTable = () => {
  const color = useTheme()?.color;
  const { spreadData } = useData();
  const atuCus = spreadData.filter((i) => i.data.purpose === "拜訪A.T.U.");
  const oldCus = spreadData.filter((i) => i.data.purpose === "拜訪現有客戶");
  const newCus = spreadData.filter((i) => i.data.purpose === "拜訪新客戶");
  const allCus = atuCus.length + oldCus.length + newCus.length;

  function getPercent(n: number): string {
    if (allCus === 0) {
      return "0";
    }
    return ((n / allCus) * 100).toFixed(1);
  }

  const nowUser = useAppSelector((state) => state.nowUser);

  const timeData = useAppSelector((state) => state.time);
  const monthArray = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const [threshold, setThreshold] = useState(0);
  useEffect(() => {
    async function getThreshold() {
      const res = await api.threshold.fetch(
        timeData.thisYear,
        nowUser.body.EmpId
      );
      const thisMonth = monthArray[new Date().getMonth()];
      setThreshold(parseInt(res[0]?.[thisMonth]));
    }
    getThreshold();
  }, [monthArray, nowUser, timeData]);
  return (
    <>
      <Table title='拜訪評估分析'>
        <table>
          <thead style={{backgroundColor:color.confirmTable.header}}>
            <tr>
              <th>目標值</th>
              <th colSpan={2}>{`≥ ${100 - threshold}`}</th>
              <th>{`≤ ${threshold}`}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>ATU</td>
              <td>既有客戶</td>
              <td>新客戶</td>
            </tr>
            <tr>
              <td>店家數</td>
              <td>{atuCus.length}</td>
              <td>{oldCus.length}</td>
              <td>{newCus.length}</td>
            </tr>
            <tr>
              <td>拜訪佔比</td>
              <td>{getPercent(atuCus.length) + "%"}</td>
              <td>{getPercent(oldCus.length) + "%"}</td>
              <td>{getPercent(newCus.length) + "%"}</td>
            </tr>
          </tbody>
        </table>
      </Table>
    </>
  );
};
