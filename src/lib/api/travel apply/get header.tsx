import axios from "axios";

export function getBusinessApplyHeader(apiPath: string) {
  return async function (id: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetTripH`,
      data: { formno: id },
    });
    return res.data;
  };
}
