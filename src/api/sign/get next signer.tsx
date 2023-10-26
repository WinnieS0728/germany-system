import axios, { AxiosResponse } from "axios";

type nextSignerResType = {
  FORMNO: string;
  SIGNORDER: number;
  STEPNAME: string;
  SIGNER: string;
  SIGNERNAME: string;
  ACTUALNAME: "";
  ACTUALSIGNER: "";
  SIGNRESULT: 0;
  OPINION: "";
  SIGNTIME: null;
  ALLOWCUSTOM: false;
  SignGroup: string;
  ISEnable: "True";
  types: "0";
  ExceId: null;
  Status: null;
};
export function getNextSigner(apiPath: string) {
  return async function (id: string) {
    const res: AxiosResponse<nextSignerResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetSignStepNext/${id}`,
    });
    return res.data;
  };
}
