import api from "@/api";
import { unVisitTS_res } from "@/api/sales analyze/get unVisit trie shop";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeDay } from "d3-time";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function useUnVisitTireShop() {
  const { thisYear } = useAppSelector((state) => state.time);
  const { id2name } = useId2name();
  const search = useSearchParams()[0];
  const search_month = search.get("month");
  const search_EmpId = search.get("EmpId");
  const [unVisitList, setUnVisitList] = useState<unVisitTS_res>([]);

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
    return {
      startDate: dateFormatter(
        new Date(timeDay.offset(new Date(), -180).setDate(1))
      ),
      endDate: dateFormatter(new Date()),
    };
  }, [search_month, thisYear]);

  useEffect(() => {
    (async function () {
      const res = (
        await api.getUnVisitTireShop({
          startDate: getRequestDate().startDate,
          endDate: getRequestDate().endDate,
        })
      )
        .filter((data) => data.Empname !== "Marcus.Rosenzweig")
        .map((data) => ({
          ...data,
          LastDate: dateFormatter(data.LastDate.split(" ")[0]),
        }));

      if (search_EmpId) {
        const EmpName = await id2name(search_EmpId);
        setUnVisitList(res.filter((data) => data.Empname === EmpName));
      } else {
        setUnVisitList(res);
      }

      // try {
      //   const dataSet = await Promise.all(
      //     res.map(async (data) => {
      //       const visitList = await api.getCusVisitList(data.custid);
      //       const visitNumber = visitList.length;
      //       const lastVisitDate = visitList.at(0)?.StartDT || "";

      //       return {
      //         ...data,
      //         Vqty: visitNumber,
      //         LastDate: lastVisitDate,
      //       };
      //     })
      //   );

      //   if (search_EmpId) {
      //     const EmpName = await id2name(search_EmpId);
      //     setUnVisitList(dataSet.filter((data) => data.Empname === EmpName));
      //   } else {
      //     setUnVisitList(dataSet);
      //   }
      // } catch (error) {
      //   console.log("request failed");
      //   if (search_EmpId) {
      //     const EmpName = await id2name(search_EmpId);
      //     setUnVisitList(res.filter((data) => data.Empname === EmpName));
      //   } else {
      //     setUnVisitList(res);
      //   }
      // }
    })();
  }, [getRequestDate, id2name, search_EmpId]);

  return unVisitList;
}
