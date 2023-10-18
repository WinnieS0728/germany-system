import { useAppSelector } from "@/utils/redux";
import api from "@/api";
import { TxReqType } from "@/api/kpi tx/tx";
import { useEffect, useState } from "react";

export type TxDataType = TxReqType & {
  EmpName: string;
  EmpId: string;
} & {
  dataExist: boolean;
};

export function useTxData() {
  const { thisYear } = useAppSelector((state) => state.time);
  const saleList = useAppSelector((state) => state.salesList).body;

  const [data, setData] = useState<TxDataType[]>([]);

  useEffect(() => {
    (async function () {
      const res = await api.tx.fetch(thisYear);

      const TxMemberData = await Promise.all(
        saleList.map(async (sales) => {
          const targetData = res.find((data) => data.Empid === sales.EmpId);
          return {
            EmpName: sales.EmpName,
            EmpId: sales.EmpId,
            s1: targetData?.Jan ? parseInt(targetData.Jan).toLocaleString() : "0",
            s2: targetData?.Feb ? parseInt(targetData.Feb).toLocaleString() : "0",
            s3: targetData?.Mar ? parseInt(targetData.Mar).toLocaleString() : "0",
            s4: targetData?.Apr ? parseInt(targetData.Apr).toLocaleString() : "0",
            dataExist: targetData ? true : false,
          };
        })
      );

      setData(TxMemberData);
    })();
  }, [saleList, thisYear]);

  return { data };
}
