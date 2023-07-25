import axios from "axios";

export function getCus(apiPath: string) {
  return async function (name: string, country?: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetSaleCustomerList`,
      data: {
        CustId: "", //客戶代號
        CustName: name || "", //客戶名稱
        CustName_E: "", //客戶英文名
        PostalCode: "", // 郵遞區號
        Country: country || "DEU", //國別
      },
    });
    return res.data;
  };
}
