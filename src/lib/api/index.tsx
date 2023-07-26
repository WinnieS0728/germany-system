import { getMemberList } from "@api/member/getMember";
import { getVisitData } from "./visit store/visit store";
import { getEvent } from "./event/get event";
import { GetThresHold } from "./kpi threshold/threshold";
import { SetThresHold } from "./kpi threshold/threshold";
import { getDept } from "./common/getDept";
import { getArea } from "./common/getArea";
import { getCus } from "./common/getCus";
import { getPostCalCode } from "./postal code/postal code";
import { addForm } from "./travel apply/create new form";
import { pushNewData } from "./travel apply/push details";
import { getBusinessApplyList } from "./travel apply/get list";
import { getBusinessApplyDetail } from "./travel apply/get detail";

const apiPath = import.meta.env.VITE_API_PATH;

const api = {
  getMember: getMemberList(apiPath),
  getVisitData: getVisitData(apiPath),
  getEvent: getEvent(apiPath),
  threshold: { fetch: GetThresHold(apiPath), post: SetThresHold(apiPath) },
  getDept: getDept(apiPath),
  getArea: getArea(apiPath),
  getCus: getCus(apiPath),
  getPostCode: getPostCalCode(apiPath),
  postNewForm: addForm(apiPath),
  pushNewData: pushNewData(apiPath),
  getBusinessApplyList: getBusinessApplyList(apiPath),
  getBusinessApplyDetail: getBusinessApplyDetail(apiPath),
};

export default api;