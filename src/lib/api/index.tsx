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
import { getBusinessApplyHeader } from "./travel apply/get header";
import { getSignList } from "./sign/signList";
import { LogIn } from "./common/log in";
import { getNextSigner } from "./sign/get next signer";
import { postOtherSign } from "./sign/post otherSign";
import { updateSignStatus } from "./sign/update sign";
import { uploadFile } from "./common/upload file";
import { uploadFileSign } from "./common/upload file sign";
import { getFormAttach } from "./common/fetch sign attach";
import { updateForm } from "./travel apply/update form";

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
  updateForm: updateForm(apiPath),
  pushNewData: pushNewData(apiPath),
  getBusinessApplyList: getBusinessApplyList(apiPath),
  getBusinessApplyDetail: getBusinessApplyDetail(apiPath),
  getBusinessApplyHeader: getBusinessApplyHeader(apiPath),
  getSignList: getSignList(apiPath),
  getNextSigner: getNextSigner(apiPath),
  logIn: LogIn(apiPath),
  postOtherSign: postOtherSign(apiPath),
  updateSignStatus: updateSignStatus(apiPath),
  uploadFile: uploadFile(apiPath),
  uploadFileSign: uploadFileSign(apiPath),
  getFormAttach: getFormAttach(apiPath),
};

export default api;
