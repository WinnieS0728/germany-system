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

// TODO 解開 api
export function postOtherSign(apiPath: string) {
  return async function (data: otherSignFinalDataType[]) {
    console.log(data);
    return '結果'
    // const res = await axios({
    //   method: "POST",
    //   url: `${apiPath}/CountersignAdd`,
    //   data: data
    // });
    // console.log(res.data)
    // return res.data
  };
}
