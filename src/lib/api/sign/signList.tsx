import { signStatus } from "@/types";
import axios, { AxiosResponse } from "axios";

type signListResType = {
  FORMNO: string;
  SIGNORDER: number;
  STEPNAME: string;
  SIGNER: string;
  SIGNERNAME: string;
  ACTUALNAME: string;
  ACTUALSIGNER: string;
  SIGNRESULT: signStatus;
  OPINION: string;
  SIGNTIME: string;
  ALLOWCUSTOM: false;
  SignGroup: string;
  ISEnable: "True";
  types: "0";
  ExceId: null;
  Status: null;
};
export function getSignList(apiPath: string) {
  return async function (id: string) {
    const res: AxiosResponse<signListResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetSignStep/${id}`,
    });
    return res.data;
  };
}
