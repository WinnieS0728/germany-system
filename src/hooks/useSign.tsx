import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@data/store";
import api from "@/api";
import { signFinalDataType } from "@/api/sign/update sign";
import { SignData } from "@/components/sign/sign box";
import { otherSignFinalDataType } from "@/api/sign/post otherSign";
import { updateFormStatus } from "@/api/travel apply/update form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { clearFile } from "@/data/reducers/files/attach";
import { memberResType } from "@/api/member/getMember";
import { useEmail } from "./useEmail";

export const useSign = () => {
  const { t } = useTranslation("toast");
  const { formId, nowOrder, signList,nextSign } = useAppSelector(
    (state) => state.formInfo
  ).body;
  const nowUser = useAppSelector((state) => state.nowUser).body;
  const dispatch = useAppDispatch();
  const { sendEmail } = useEmail();

  const isFinalSigner = useMemo(() => {
    const nowSign = nowOrder;
    const lastSign = signList[signList.length - 1]?.SIGNORDER;
    if (nowSign === lastSign) {
      return true;
    } else {
      return false;
    }
  }, [nowOrder, signList]);

  async function updateFormStatus(agree: "yes" | "no" | "delete") {
    let data: updateFormStatus | undefined;
    let popupText = "";
    if (agree === "delete") {
      data = {
        BTPId: formId,
        Status: "4", // 作廢
        type: "1",
      };
      popupText = t("formStatus.void");
      afterSign();
    } else if (agree === "no") {
      data = {
        BTPId: formId,
        Status: "3", // 退簽
        type: "1",
      };
      popupText = t("formStatus.return");
    } else if (agree === "yes" && isFinalSigner) {
      data = {
        BTPId: formId,
        Status: "2", // 完簽
        type: "1",
      };
      popupText = t("formStatus.done");
    }
    if (!data) {
      return; // 繼續簽
    }
    const request = api.updateForm(data);
    toast.promise(request, {
      pending: t("formStatus.pending"),
      success: `${formId} ${popupText}`,
      error: t("formStatus.fail"),
    });
  }
  function getSignNumber(value: string) {
    if (value === "yes") {
      return 1;
    }
    if (value === "no") {
      return 3;
    }
    return 0;
  }

  const navigate = useNavigate();
  function afterSign() {
    setTimeout(() => {
      navigate(`../apply`);
    }, 1000);
  }

  async function sign(data: SignData) {
    const signFinalData: signFinalDataType = {
      ...(nextSign as {
        FORMNO: string;
        SIGNORDER: number;
        STEPNAME: string;
        SIGNER: string;
        SIGNERNAME: string;
        ALLOWCUSTOM: boolean;
        SignGroup: string;
        ISEnable: string;
        Status: string;
      }),
      ACTUALNAME: nowUser.EmpName,
      ACTUALSIGNER: nowUser.EmpId,
      SIGNRESULT: getSignNumber(data.agree),
      OPINION: data.opinion as string,
      SIGNTIME: "",
      types: "1",
      ExceId: nowUser.EmpId,
    };
    const request = api.updateSignStatus(signFinalData);
    toast.promise(request, {
      pending: t("sign.pending"),
      success: t("sign.success"),
      error: t("sign.fail"),
    });
    // console.log("更新簽核狀態元件", res);

    dispatch(clearFile());
    afterSign();
  }

  function getTitle(obj: memberResType) {
    return parseInt(obj.Title.split("-")[0]);
  }
  async function otherSign(list: string[]) {
    const otherSignMember = (
      await Promise.all(
        list.map(async (id: string) => (await api.getMember(id))[0])
      )
    ).sort((a, b) => getTitle(a) - getTitle(b));

    const otherSignMemberList = otherSignMember.map(
      (member): otherSignFinalDataType => {
        return {
          FORMNO: formId,
          SIGNORDER: nowOrder,
          STEPNAME: member.DeptName,
          SIGNER: member.EmpId,
          SIGNERNAME: member.EmpName,
          OPINION: "",
          SignGroup: "會簽",
        };
      }
    );

    const request = api.postOtherSign(otherSignMemberList);
    toast.promise(request, {
      pending: t("otherSign.pending"),
      success: t("otherSign.success"),
      error: t("otherSign.fail"),
    });

    const recipient = otherSignMember[0].EmpId;
    sendEmail(recipient, "other");

    dispatch(clearFile());
    afterSign();
  }

  async function signOver() {
    const restMember = signList.slice(nowOrder + 1);
    // console.log(restMember);

    const data: signFinalDataType[] = restMember.map((member) => {
      return {
        ...(member as unknown as {
          FORMNO: string;
          SIGNORDER: number;
          STEPNAME: string;
          SIGNER: string;
          SIGNERNAME: string;
          ALLOWCUSTOM: boolean;
          SignGroup: string;
          ISEnable: string;
          Status: string;
        }),
        ACTUALNAME: "",
        ACTUALSIGNER: "",
        SIGNRESULT: 5,
        types: "1",
        OPINION: "",
        SIGNTIME: "",
        ExceId: nowUser.EmpId,
      };
    });
    for (const i of data) {
      (function () {
        api.updateSignStatus(i);
      })();
    }
    // console.log("已完簽");
  }

  return {
    sign,
    updateFormStatus,
    otherSign,
    signOver,
  };
};
