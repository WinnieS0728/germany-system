import axios, { AxiosResponse } from "axios";

export type areaResType = {
  CountryId: string;
  MArea: "DEU";
  AreaName: "德國";
  Country: string;
  Country_E: string;
  ISEnable: "Y";
};

export function getArea(apiPath: string) {
  return async function (country?: string) {
    const res: AxiosResponse<areaResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetArea`,
      data: {
        CountryId: "",
        Country: "",
        Country_E: "",
        MArea: country || "DEU",
      },
    });
    return res.data;
  };
}
