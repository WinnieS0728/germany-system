import { getMemberList } from "@api/member/getMember";
import { getVisitData } from "./visit store/visit store";
import { getEvent } from "./event/get event";
import { GetThresHold } from "./kpi threshold/threshold";
import { SetThresHold } from "./kpi threshold/threshold";
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
import { uploadFileSign } from "./common/upload file sign";
import { getFormAttach } from "./common/fetch sign attach";
import { updateForm } from "./travel apply/update form";
import { downloadFile } from "./common/download file";
import { getGroup } from "./common/get group";
import { sendEmail } from "./common/email";

const apiPath = import.meta.env.VITE_API_PATH;

const api = {
  // common
  getMember: getMemberList(apiPath),
  getArea: getArea(apiPath),
  getCus: getCus(apiPath),
  logIn: LogIn(apiPath),
  getMemberGroup: getGroup(apiPath),
  getFormAttach: getFormAttach(apiPath),
  sendEmail: sendEmail(apiPath),
  //files
  uploadFileSign: uploadFileSign(apiPath),
  downloadFile: downloadFile(apiPath),
  // event
  getEvent: getEvent(apiPath),
  // analyze
  getVisitData: getVisitData(apiPath),
  threshold: { fetch: GetThresHold(apiPath), post: SetThresHold(apiPath) },
  // trip
  getPostCode: getPostCalCode(), // * local file
  getBusinessApplyList: getBusinessApplyList(apiPath),
  getBusinessApplyDetail: getBusinessApplyDetail(apiPath),
  getBusinessApplyHeader: getBusinessApplyHeader(apiPath),
  // post trip
  postNewForm: addForm(apiPath),
  updateForm: updateForm(apiPath),
  pushNewData: pushNewData(apiPath),
  //sign
  getSignList: getSignList(apiPath),
  getNextSigner: getNextSigner(apiPath),
  updateSignStatus: updateSignStatus(apiPath),
  postOtherSign: postOtherSign(apiPath),
};

export default api;
