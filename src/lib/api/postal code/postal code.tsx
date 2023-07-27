import { dontShowError } from "@/hooks/no error plz";
import axios from "axios";

export function getPostCalCode(apiPath: string) {
  dontShowError(apiPath);
  return async function () {
    const res = await axios({
      method: "POST",
      url: `src/utils/zipcodes.de.json`,
    });
    return res.data;
  };
}
