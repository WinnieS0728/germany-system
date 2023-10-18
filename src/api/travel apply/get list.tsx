import { statusStringType } from "@/hooks/status translate";
import axios, { AxiosResponse } from "axios";

export type fetchFormListBody = {
  formStatus?: "1" | "2" | "3" | "4";
  EmpId?: string;
  dept?: string;
};

export type tripListResType = {
  BTPId: string;
  Status: statusStringType;
  Comid: string;
  Coname: string;
  TripEvent: string;
  Cname: string;
  TQty: string;
  Createid: string;
  EmpName: string;
  StartDT: string;
  STNAME: string;
  SIGNER: string;
  SName: string;
};
export function getBusinessApplyList(apiPath: string) {
  return async function (data: fetchFormListBody) {
    const res: AxiosResponse<tripListResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetTraveAppList`,
      data: {
        Status: data.formStatus || "", //狀態
        Createid: data.EmpId || "", //建檔人
        DeptId: data.dept || "", //部門id
      },
    });
    return res.data;
  };
}
