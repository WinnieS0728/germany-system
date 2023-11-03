import axios, { AxiosResponse } from "axios";

export type cusResType = {
  CustId: string;
  CustName: string;
  CustName_E: string;
  MArea: null;
  PostalCode: string;
  CountryId: null;
  Country: "DEU";
  CountryE: null;
  Empid: null;
  Assigned: "";
  CType: "";
  ErpNo: string;
};

interface request {
  name?: string;
  country?: string;
  id?: string;
}
export function getCus(apiPath: string) {
  return async function ({ name, country, id }: request) {
    const res: AxiosResponse<cusResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetSaleCustomerList`,
      data: {
        CustId: id || "", //客戶代號
        CustName: name || "", //客戶名稱
        CustName_E: "", //客戶英文名
        PostalCode: "", // 郵遞區號
        Country: country || "DEU", //國別
      },
    });
    return res.data;
  };
}
