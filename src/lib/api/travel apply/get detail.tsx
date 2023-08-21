import axios, { AxiosResponse } from "axios";

export type tripDetailResType = {
  BTPId: string;
  Item: string;
  CustId: string;
  CustName: string;
  TripEvent: string;
  ResourcesName: string;
  ResourcesName_E: string;
  Description: string;
  Area: string;
  Country: string;
  City: string;
  Hotel: string;
  StartDT: string;
  EndDT: string;
};

export function getBusinessApplyDetail(apiPath: string) {
  return async function (id: string) {
    const res: AxiosResponse<tripDetailResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetTraveAppD`,
      data: { formno: id },
    });
    return res.data;
  };
}
