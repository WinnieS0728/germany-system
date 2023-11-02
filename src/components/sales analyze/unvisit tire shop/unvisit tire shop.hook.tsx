import api from "@/api";
import { unVisitTS_res } from "@/api/sales analyze/get unVisit trie shop";
import { dateFormatter } from "@/utils/dateFormatter";
import { timeDay } from "d3-time";
import { useEffect, useState } from "react";

export function useUnVisitTireShop() {
  const [startDate, setStartDate] = useState<string>(
    dateFormatter(new Date(timeDay.offset(new Date(), -180).setDate(1)))
  );
  const [endDate, setEndDate] = useState<string>(dateFormatter(new Date()));
  const [unVisitList, setUnVisitList] = useState<unVisitTS_res>([]);

  useEffect(() => {
    (async function () {
      const res = (await api.getUnVisitTireShop({
        startDate,
        endDate,
      })).filter(data=>data.Vqty === 0);

      // const dataSet = await Promise.all(res.filter(data=>data.Vqty === 0).map(async (data) => {
      //   const visitList = await api.getCusVisitList(data.custid);
      //   const visitNumber = visitList.length;
      //   const lastVisitDate = visitList.at(0)?.StartDT || "";

      //   return {
      //     ...data,
      //     Vqty: visitNumber,
      //     LastDate: lastVisitDate,
      //   };
      // }));
      

      setUnVisitList(res);
    })();
  }, [endDate, startDate]);

  return unVisitList;
}
