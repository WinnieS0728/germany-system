import axios from "axios";

export function getNextSigner(apiPath: string) {
  return async function (id: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetSignStepNext/${id}`,
    });
    return res.data;
  };
}
