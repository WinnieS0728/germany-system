import axios from "axios";

export type TxResType = {
  YYYY: string;
  Empid: string;
  EmpName: string;
  STYPE: string;
  Sname: string;
  Jan: string;
  Feb: string;
  Mar: string;
  Apr: string;
  COUNTRY: string;
  CREATEID: string;
  CEmpName: string;
  CREATEDATE: string;
};

export type TxReqType = {
  s1: string;
  s2: string;
  s3: string;
  s4: string;
};
export function getTxKpi(apiPath: string) {
  return async function (year: string, id?: string) {
    const res = await axios<TxResType[]>({
      method: "POST",
      url: `${apiPath}/GetSalesCom`,
      data: {
        YYYY: year, //西元年
        EmpId: id || "", //員工
        TYPE: "tx", //類型 如即有客戶
      },
    });

    return res.data;
  };
}

export function setTxKpi(apiPath: string) {
  return async function (
    year: string,
    id: string,
    data: TxReqType,
    type: boolean,
    nowUser: string
  ) {
    // console.log({ year }, { id }, { data }, { type }, { nowUser });

    const res = await axios<string>({
      method: "POST",
      url: `${apiPath}/SalesComAdd`,
      data: {
        YYYY: year, //西元年
        EmpId: id, //員工
        STYPE: "tx", //類型 如即有客戶
        Jan: data.s1, //一月
        FEB: data.s2, //二月
        MAR: data.s3, //三月
        APR: data.s4, //四月
        COUNTRY: "GERMANY", //國家
        CREATEID: nowUser, //建檔人
        Type: type ? "1" : "0", //0 新增 1 修改
      },
    });

    // return 設定新增完成
    return res.data;
  };
}
