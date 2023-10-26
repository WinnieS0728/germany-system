import axios, { AxiosResponse } from "axios";

export type tripDetailType = {
  Area: string;
  BTPId: string;
  City: string;
  Country: string;
  CustId: string;
  Description: string;
  EndDT: string;
  Hotel: string;
  Item: number;
  StartDT: string;
  TripEvent: string;
};
export function pushNewData(apiPath: string) {
  return async function (data: tripDetailType[]) {
    const res:AxiosResponse<string> = await axios({
      method: "POST",
      url: `${apiPath}/TraveAppDAdd`,
      data: data,
    });
    return res.data;
  };
}
