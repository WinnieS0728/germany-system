import axios from "axios";

export function getSignList(apiPath: string) {
  return async function (id: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetSignStep/${id}`,
    });
    return res.data;
  };
}
