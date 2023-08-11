import axios from "axios";

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
    const res = await axios({
      method: "POST",
      url: `${apiPath}/TraveAppDAdd`,
      data: data,
    });

    // TODO log 出差detail
    console.log("建立出差detail api回傳", res.data);

    return res.data;
  };
}
