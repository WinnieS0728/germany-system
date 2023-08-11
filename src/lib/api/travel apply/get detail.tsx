import axios from "axios";

export function getBusinessApplyDetail(apiPath: string) {
  return async function (id: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetTraveAppD`,
      data: { formno: id },
    });    
    return res.data;
  };
}
