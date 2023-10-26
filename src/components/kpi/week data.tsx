import { setThreshold } from "@/data/actions/kpi threshold/threshold";
import { thresholdResType } from "@/api/kpi threshold/threshold";
import { visit_otherResType } from "@/api/visit store/visit store";
import { useAppDispatch, useAppSelector } from "@data/store";
import { useEffect } from "react";


export type salesThresholdData = {
  name: string;
  visitData: Record<string, number>;
  threshold: thresholdResType;
};

export function GetData() {
  const visitData = useAppSelector((state) => state.weekVisit);  
  const salesData = useAppSelector((state) => state.salesList);
  const timeData = useAppSelector((state) => state.time);
  const threshold = useAppSelector((state) => state.threshold);

  function getStorNumber(data: visit_otherResType[], key: string): number {
    if (!data) return 0;
    const num = data
      .filter((i) => i.ResourcesName === key)
      .map((i) => +i.Vqty)
      .reduce((a, b) => a + b, 0);
    return num;
  }

  function getSalesVisitData(name: string): {
    [key: string]: number;
  } {
    const data = visitData.body?.filter((i) => i.empname === name);

    const atu = getStorNumber(data, "拜訪A.T.U.") || 0;
    const existCus = getStorNumber(data, "拜訪既有客戶") || 0;
    const newCus = getStorNumber(data, "拜訪新客戶") || 0;
    const old = atu + existCus;
    const total = atu + existCus + newCus;

    return {
      atu,
      existCus,
      newCus,
      old,
      total,
    };
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setThreshold(timeData.thisYear));
  }, [dispatch, salesData, timeData]);
  // console.log(threshold.body);

  const salesDataList: salesThresholdData[] = salesData.body.map((i) => {
    const name = i ? i.EmpName : "";
    return {
      name: name,
      visitData: getSalesVisitData(name),
      threshold: threshold.body.find(
        (i) => i.EmpName === name
      ) as thresholdResType,
    };
  });

  return salesDataList;
}

