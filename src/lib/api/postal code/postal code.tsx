import axios, { AxiosResponse } from "axios";

export type postcodeResType = {
  country_code: "DE";
  zipcode: string;
  place: string;
  state: string;
  state_code: string;
  province: string;
  province_code: string;
  community: string;
  community_code: string;
  latitude: string;
  longitude: string;
};
export function getPostCalCode() {
  return async function () {
    const res: AxiosResponse<postcodeResType[]> = await axios({
      method: "GET",
      url: `./data/zipcodes.de.json`,
    });
    return res.data;
  };
}
