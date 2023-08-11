import axios from "axios";

export type updateFormStatus = {
  BTPId: string,
  Status: "2" | "3" | "4", // 完簽
  type: "1",
}
export function updateForm(apiPath: string) {
  return async function (data: updateFormStatus) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/TraveAppHAdd`,
      data: data,
    });
    // TODO log 更新
    console.log('更新大單(簽核狀態) api回傳',res.data);
    return res.data;
  };
}
