import { Table } from "@/components/table/table";
import { useData } from "./data";
import * as Btns from "@components/UI/buttons";
import { useAppSelector } from "@/hooks/redux";
import api from "@/lib/api";
import { useEffect, useState } from "react";

export const PerCentTable = () => {
  const { data } = useData();
  const atuCus = data.filter((i) => i.data.purpose === "拜訪A.T.U.");
  const oldCus = data.filter((i) => i.data.purpose === "拜訪現有客戶");
  const newCus = data.filter((i) => i.data.purpose === "拜訪新客戶");
  const allCus = atuCus.length + oldCus.length + newCus.length;

  function getPercent(n: number): string {
    if (allCus === 0) {
      return "0";
    }
    return ((n / allCus) * 100).toFixed(1);
  }

  const nowUser = useAppSelector((state) => state.nowUser);
  console.log(nowUser.body.EmpId);

  const timeData = useAppSelector((state) => state.time);
  const [thresHold, setThreshold] = useState(0);
  useEffect(() => {
    async function getThreshold() {
      const res = await api.threshold.fetch(
        timeData.thisYear,
        nowUser.body.EmpId
      );
      console.log(res[0]);
      //   TODO setThreshold
    }
    getThreshold();
  }, [nowUser, timeData]);
  return (
    <>
      <Table title='拜訪評估分析'>
        <table>
          <thead>
            <tr>
              <th>目標值</th>
              <th colSpan={2}>75</th>
              <th>25</th>
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
      <div className='flex items-center justify-center gap-4 py-4'>
        <Btns.LongBtn type='reset' />
        <Btns.LongBtn type='submit' />
      </div>
    </>
  );
};
