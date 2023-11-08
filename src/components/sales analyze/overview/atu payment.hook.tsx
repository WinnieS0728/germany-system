import api from "@/api";
import { Month_MM } from "@/const";
import { useAppSelector } from "@/data/store";
import {
  QueryFunctionContext,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { queryStatus } from "@/types";
import { useSearchParams } from "react-router-dom";
import { useId2name } from "@/hooks/id2name";

type atuPaymentType = {
  EmpName: string;
  txNumber: number;
  payment: number[];
};

interface atuPaymentReturn extends queryStatus {
  atuPayment: atuPaymentType[];
}

export function useAtuPayment(): atuPaymentReturn {
  const salesList = useAppSelector((state) => state.salesList).body;
  const { thisYear } = useAppSelector((state) => state.time);
  const search = useSearchParams()[0];
  const search_EmpId = search.get("EmpId");
  const { id2name } = useId2name();

  const atuPaymentQuires = useQueries({
    queries: salesList.map((member) => ({
      queryKey: ["atuPayment", { type: "all" }, member.EmpName],
      queryFn: async ({
        queryKey,
      }: QueryFunctionContext): Promise<atuPaymentType> => {
        const EmpName = queryKey[2] as string;
        const res = await api.getAtuPayment(thisYear);

        const thisSalesList = res.filter((data) => data.Empname === EmpName);

        const everyMonthData = Month_MM.map((month) =>
          thisSalesList
            .filter((data) => data.MM === Number(month))
            .map((data) => data.Sqty)
            .reduce((a, b) => a + b, 0)
        );

        const txNumber = everyMonthData.reduce((a, b) => a + b, 0);
        return {
          EmpName,
          txNumber: txNumber,
          payment: everyMonthData,
        };
      },
    })),
  });

  const { data: EmpName } = useQuery({
    queryKey: ["EmpName", search_EmpId],
    enabled: !!search_EmpId,
    queryFn: () => id2name(search_EmpId as string),
  });

  if (atuPaymentQuires.some((query) => query.isPending)) {
    return {
      status: "pending",
      atuPayment: [],
    };
  }
  if (atuPaymentQuires.some((query) => query.isError)) {
    return {
      status: "error",
      message: atuPaymentQuires.find((query) => query.isError)?.error?.message,
      atuPayment: [],
    };
  }

  if (EmpName) {
    return {
      status: "success",
      atuPayment: atuPaymentQuires
        .map((query) => query.data as atuPaymentType)
        .filter((data) => data.EmpName === EmpName),
    };
  }

  return {
    status: "success",
    atuPayment: atuPaymentQuires.map((query) => query.data as atuPaymentType),
  };
}
