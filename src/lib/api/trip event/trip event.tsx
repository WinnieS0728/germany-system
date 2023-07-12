import axios from "axios";

export function getTripEvent(apiPath: string) {
  return async function () {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetResource`,
      data: {
        "type":"TripEvent"
    }
    });
    return res.data;
  };
}
