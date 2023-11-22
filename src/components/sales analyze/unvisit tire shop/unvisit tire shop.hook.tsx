import api from "@/api";
import { unVisitTS_res } from "@/api/sales analyze/get unVisit trie shop";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { queryStatus } from "@/types";
import { dateFormatter } from "@/utils/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { timeDay } from "d3-time";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface unVisitTSReturn extends queryStatus {
  unVisitData: unVisitTS_res;
}

export function useUnVisitTireShop(): unVisitTSReturn {
  const { thisYear } = useAppSelector((state) => state.time);
  const { id2name } = useId2name();
  const search = useSearchParams()[0];
  const search_month = search.get("month");
  const search_EmpId = search.get("EmpId");

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

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["unVisit",search_month, search_EmpId],
    queryFn: () => getUnVisitTS(),
  });

  async function getUnVisitTS() {
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
      return res.filter((data) => data.Empname === EmpName);
    } else {
      return res;
    }
  }

  if (isPending) {
    return {
      status: "pending",
      unVisitData: [],
    };
  }
  if (isError) {
    return {
      status: "error",
      unVisitData: [],
      message: error.message,
    };
  }

  return {
    status: "success",
    unVisitData: data,
  };
}
