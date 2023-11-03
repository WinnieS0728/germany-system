import api from "@/api";
import { unOrderTS_res } from "@/api/sales analyze/get unOrder trie shop";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { dateFormatter } from "@/utils/dateFormatter";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useUnOrderTireShop() {
  const { thisYear } = useAppSelector((state) => state.time);
  const { id2name } = useId2name();
  const search = useSearchParams()[0];
  const search_month = search.get("month");
  const search_EmpId = search.get("EmpId");
  const [unOrderList, setUnOrderList] = useState<unOrderTS_res>([]);

  const getRequestDate = useCallback(() => {
    if (search_month) {
      const startDate = (function () {
        const month = search_month.split("_")[0];
        return dateFormatter(new Date(`${thisYear}-${month}-1`));
      })();
      const endDate = (function () {
        const month = search_month.split("_")[1];
        const nextMonth = Number(month) + 1;
        const nextMonth_MM =
          nextMonth < 10 ? `0${nextMonth}` : String(nextMonth);
        return dateFormatter(
          new Date(new Date(`${thisYear}-${nextMonth_MM}`).setDate(0))
        );
      })();

      return {
        startDate,
        endDate,
      };
    }
    const prevYear = Number(thisYear) - 1;
    return {
      startDate: dateFormatter(new Date(new Date().setFullYear(prevYear))),
      endDate: dateFormatter(new Date()),
    };
  }, [search_month, thisYear]);

  useEffect(() => {
    (async function () {
      const res = (
        await api.getUnOrderTireShop({
          startDate: getRequestDate().startDate,
          endDate: getRequestDate().endDate,
        })
      )
        .filter((data) => data.Empname !== "Marcus.Rosenzweig")
        .map((data) => ({
          ...data,
          LastDate: dateFormatter(data.LastDate),
        }));

      if (search_EmpId) {
        const EmpName = await id2name(search_EmpId);
        setUnOrderList(res.filter((data) => data.Empname === EmpName));
      } else {
        setUnOrderList(res);
      }
    })();
  }, [getRequestDate, id2name, search_EmpId]);

  return unOrderList;
}
