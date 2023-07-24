import axios from "axios";

export function GetThresHold(apiPath: string) {
  return async function (year: string, id?: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetSalesCom`,
      data: {
        YYYY: year, //西元年
        EmpId: id || "", //員工
        TYPE: "TripEvent-7", //類型 如即有客戶
      },
    });
    return res.data;
  };
}

export function SetThresHold(apiPath: string) {
  return async function (
    year: string,
    id: string,
    data: { [keys: string]: number | undefined },
    type: boolean,
    nowUser: string
  ) {
    // console.log({ year }, { id }, { data }, { type }, { nowUser });

    try {
      const res = await axios({
        method: "POST",
        url: `${apiPath}/SalesComAdd`,
        data: {
          YYYY: year, //西元年
          EmpId: id, //員工
          STYPE: "TripEvent-7", //類型 如即有客戶
          Jan: data.Jan, //一月
          FEB: data.Feb, //二月
          MAR: data.Mar, //三月
          APR: data.Apr, //四月
          MAY: data.May, //五月
          JUN: data.Jun, //六月
          JUL: data.Jul, //七月
          AUG: data.Aug, //八月
          SEP: data.Sep, //九月
          OCT: data.Oct, //十月
          NOV: data.Nov, //十一月
          DEC: data.Dec, //十二月
          COUNTRY: "GERMANY", //國家
          CREATEID: nowUser, //建檔人
          Type: type ? "1" : "0", //0 新增 1 修改
        },
      });
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };
}
