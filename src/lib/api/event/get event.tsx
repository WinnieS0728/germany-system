import axios from "axios";

export function getEvent(apiPath: string) {
  return async function (type: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetResource`,
      data: {
        type: type,
      },
    });
    return res.data;
  };
}
