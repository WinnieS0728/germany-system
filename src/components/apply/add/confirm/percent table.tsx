import { Table } from "@/components/table/table";
import { detailDataWithSingleData } from "@/data/reducers/trip detail/trip detail";
import api from "@/lib/api";
import { tripEvent } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";

export const PerCentTable = ({
  data,
  EmpId,
  time,
}: {
  data: detailDataWithSingleData[][];
  EmpId: string;
  time: {
    year: string;
    month: string;
  };
}) => {
  // console.log(data);

  const { t } = useTranslation("confirm modal");
  const color = useTheme()?.color;
  const totalData = data.reduce((a, b) => a.concat(b), []);
  const atuCus = totalData.filter((i) => i.data?.eventId === tripEvent.atu);
  const oldCus = totalData.filter((i) => i.data?.eventId === tripEvent.oldCus);
  const newCus = totalData.filter((i) => i.data?.eventId === tripEvent.newCus);
  const allCus = atuCus.length + oldCus.length + newCus.length;

  function getPercent(n: number): string {
    if (allCus === 0) {
      return "0";
    }
    return ((n / allCus) * 100).toFixed(1);
  }
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
      const res = await api.threshold.fetch(time.year, EmpId);
      const thisMonth =
        monthArray[new Date(`2023-${time.month}-01`).getMonth()];
      setThreshold(parseInt(res?.[0]?.[thisMonth]) || 0);
    }
    getThreshold();
  }, [EmpId, monthArray, time]);
  return (
    <>
      <Table title={t("percentTable.title")}>
        <table>
          <thead style={{ backgroundColor: color.confirmTable.header }}>
            <tr>
              <th>{t("percentTable.threshold")}</th>
              <th colSpan={2}>{`≥ ${100 - threshold}`}</th>
              <th>{`≤ ${threshold}`}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>{t("percentTable.atu")}</td>
              <td>{t("percentTable.oldCus")}</td>
              <td>{t("percentTable.newCus")}</td>
            </tr>
            <tr>
              <td>{t("percentTable.number")}</td>
              <td>{atuCus.length}</td>
              <td>{oldCus.length}</td>
              <td>{newCus.length}</td>
            </tr>
            <tr>
              <td>{t("percentTable.percent")}</td>
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
