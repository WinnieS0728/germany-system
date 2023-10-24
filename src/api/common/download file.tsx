import axios from "axios";

export function downloadFile(apiPath: string) {
  return async function (path: string) {
    const res = await axios<string>({
      method: "GET",
      url: `${apiPath}/Download?file=${path}`,
      responseType: "blob",
    });
    return res.data;
  };
}
