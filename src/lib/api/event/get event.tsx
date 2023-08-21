import axios, { AxiosResponse } from "axios";

type argType = "TripEvent" | "Traffic";

export type trafficEvent = {
  ResourcesId: string;
  type: "Traffic";
  ResourcesName: string;
  ResourcesName_E: string;
};

export type tripEvent = {
  ResourcesId: string;
  type: "TripEvent";
  ResourcesName: string;
  ResourcesName_E: string;
};

type eventResType = trafficEvent | tripEvent;

export function getEvent(apiPath: string) {
  return async function (type: argType) {
    const res: AxiosResponse<eventResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetResource`,
      data: {
        type: type,
      },
    });
    return res.data;
  };
}
