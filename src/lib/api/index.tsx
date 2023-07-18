import { getMemberList } from "@api/member/getMember";
import { getVisitData } from "./visit store/visit store";
import { getTripEvent } from "./trip event/trip event";
import { GetThresHold } from "./kpi threshold/threshold";
import { SetThresHold } from "./kpi threshold/threshold";
import { getDept } from "./common/getDept";
import { getArea } from "./common/getArea";
import { getCus } from "./common/getCus";

const apiPath = import.meta.env.VITE_API_PATH;

const api = {
  getMember: getMemberList(apiPath),
  getVisitData: getVisitData(apiPath),
  getTripEvent: getTripEvent(apiPath),
  threshold: { fetch: GetThresHold(apiPath), post: SetThresHold(apiPath) },
  getDept: getDept(apiPath),
  getArea: getArea(apiPath),
  getCus: getCus(apiPath),
};

export default api;
