import axios from "axios";

export type otherSignFinalDataType = {
  FORMNO: string;
  SIGNORDER: string | number;
  STEPNAME: string;
  SIGNER: string;
  SIGNERNAME: string;
  OPINION: string;
  SignGroup: string & "會簽";
};

export function postOtherSign(apiPath: string) {
  return async function (data: otherSignFinalDataType[]) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/CountersignAdd`,
      data: data
    });
    // TODO log會簽
    console.log('會簽api回傳',res.data)
    return res.data
  };
}
