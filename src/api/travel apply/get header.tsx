import { moneyType } from "@/types";
import axios, { AxiosResponse } from "axios";

type tripHeaderResType = {
  BTPId: string;
  status: string;
  Comid: string;
  Coname: string;
  IsForeign: "";
  IsLodging: "N" | "Y";
  Transport: string;
  ResourcesName_E: string;
  Advance_Ticket: "0";
  Advance_Lodging: "0";
  Advance_Amount: string;
  Deputy: string;
  DeputyEmpName: string;
  Createid: string;
  EmpName: string;
  Createdate: string;
  Curr: typeof moneyType[number];
  Days: string;
  StayDays: string;
};
export function getBusinessApplyHeader(apiPath: string) {
  return async function (id: string) {
    const res: AxiosResponse<tripHeaderResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetTripH`,
      data: { formno: id },
    });
    return res.data;
  };
}
