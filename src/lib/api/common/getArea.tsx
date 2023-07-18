import axios from "axios";

export function getArea(apiPath: string) {
  return async function (country?: string) {
    const res = await axios({
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
