import { signStatus } from "@/types";
import { signStatus_E } from "@/types";
import axios from "axios";

export type signFinalDataType = {
  FORMNO: string;
  SIGNORDER: number; //簽核順序
  STEPNAME: string;
  SIGNER: string; //簽核人員代號
  SIGNERNAME: string; //簽核人員名稱
  ACTUALNAME: string; //實際簽核人員名稱(EX: 假如財務請假，就會請財務代理人簽核
  ACTUALSIGNER: string; //實際簽核人員代號 是否簽核 未簽核回傳: ""
  SIGNRESULT: signStatus | signStatus_E;
  OPINION: string; //簽核意見
  SIGNTIME: string; //簽核時間
  ALLOWCUSTOM: boolean; //是否自訂簽核
  SignGroup: string; //簽核群組
  ISEnable: string; //是否顯示
  types: "1"; //1修改
  ExceId: string; //建立人
  Status: string;
};

export function updateSignStatus(apiPath: string) {
  return async function (data: signFinalDataType) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/SignStepupdate`,
      data: data,
    });
    return res.data;
  };
}
