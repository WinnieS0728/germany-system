import axios from "axios";

export function getPostCalCode(apiPath: string) {
  return async function () {
    const res = await axios({
      method: "POST",
      url: `src/utils/zipcodes.de.json`,
    });
    return res.data;
  };
}
