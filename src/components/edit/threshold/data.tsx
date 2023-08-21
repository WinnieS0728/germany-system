import { useAppSelector } from "@/hooks/redux";
import { memberResType } from "@/lib/api/member/getMember";
import { monthType } from "@/types";

export type thresholdList_emp = Pick<memberResType, "EmpId" | "EmpName">;
export type threshold_number = {
  existCus: number;
  newCus: number;
};
export type threshold_data = Record<monthType, threshold_number>;

export function GetData() {
  const salesList = useAppSelector((state) => state.salesList);
  const threshold = useAppSelector((state) => state.threshold);

  function value2Object(value: string): threshold_number {
    return {
      existCus: (100 - parseInt(value)) | 0,
      newCus: parseInt(value) | 0,
    };
  }

  const data: (Partial<thresholdList_emp> & threshold_data)[] =
    salesList.body.map((p) => {
      const targetObject = threshold.body.find((i) => i.EmpName === p?.EmpName);

      return {
        EmpName: p?.EmpName,
        EmpId: p?.EmpId,
        Jan: value2Object(targetObject?.Jan as string),
        Feb: value2Object(targetObject?.Feb as string),
        Mar: value2Object(targetObject?.Mar as string),
        Apr: value2Object(targetObject?.Apr as string),
        May: value2Object(targetObject?.May as string),
        Jun: value2Object(targetObject?.Jun as string),
        Jul: value2Object(targetObject?.Jul as string),
        Aug: value2Object(targetObject?.Aug as string),
        Sep: value2Object(targetObject?.Sep as string),
        Oct: value2Object(targetObject?.Oct as string),
        Nov: value2Object(targetObject?.Nov as string),
        Dec: value2Object(targetObject?.Dec as string),
      };
    });

  const dataExist = salesList.body.map((p) => {
    return threshold.body.some((d) => d.Empid === p?.EmpId);
  });

  const status = threshold.status;
  // console.log({ data });
  return {
    dataSet: data,
    status: status,
    dataExist: dataExist,
  };
}
