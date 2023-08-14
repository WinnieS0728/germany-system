import { useMemo } from "react";
import { useAppSelector } from "./redux";
import api from "@/lib/api";
import { signFinalDataType } from "@/lib/api/sign/update sign";
import { SignData } from "@/components/sign/sign box";
import { otherSignFinalDataType } from "@/lib/api/sign/post otherSign";
import { updateFormStatus } from "@/lib/api/travel apply/update form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useSign = () => {
  const formInfo = useAppSelector((state) => state.formInfo).body;
  const nowUser = useAppSelector((state) => state.nowUser).body;

  const isFinalSigner = useMemo(() => {
    const nowSign = formInfo.nowOrder;
    const lastSign = formInfo.signList[formInfo.signList.length - 1]?.SIGNORDER;
    if (nowSign === lastSign) {
      return true;
    } else {
      return false;
    }
  }, [formInfo]);

  async function updateFormStatus(agree: "yes" | "no" | "delete") {
    let data: updateFormStatus | undefined;
    let popupText = "";
    if (agree === "delete") {
      data = {
        BTPId: formInfo.formId,
        Status: "4", // 作廢
        type: "1",
      };
      popupText = "已作廢";
    } else if (agree === "no") {
      data = {
        BTPId: formInfo.formId,
        Status: "3", // 退簽
        type: "1",
      };
      popupText = "已退簽";
    } else if (agree === "yes" && isFinalSigner) {
      data = {
        BTPId: formInfo.formId,
        Status: "2", // 完簽
        type: "1",
      };
      popupText = "已完簽";
    }
    if (!data) {
      return;
    }
    toast.success(`${formInfo.formId} ${popupText}`);
    const res = await api.updateForm(data);
    // const res = await toast.promise(request, {
    //   pending: "處理中...",
    //   success: "表單狀態更新完成",
    //   error: "表單狀態更新失敗",
    // });
    // console.log("更新表單狀態api", res);
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
      navigate("../apply");
    }, 2500);
  }

  async function sign(data: SignData) {
    const signFinalData: signFinalDataType = {
      ...(formInfo.nextSign as {
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
    const res = await toast.promise(request, {
      pending: "處理中...",
      success: "簽核完成",
      error: "簽核失敗",
    });
    // console.log("更新簽核狀態元件", res);

    afterSign();
  }

  async function otherSign(list: string[]) {
    const otherSignMember = await Promise.all(
      list.map(async (id: string) => (await api.getMember(id))[0])
    );
    const otherSignMemberList = otherSignMember.map(
      (member): otherSignFinalDataType => {
        return {
          FORMNO: formInfo.formId,
          SIGNORDER: formInfo.nowOrder,
          STEPNAME: member.DeptName,
          SIGNER: member.EmpId,
          SIGNERNAME: member.EmpName,
          OPINION: "",
          SignGroup: "會簽",
        };
      }
    );

    const request = api.postOtherSign(otherSignMemberList);
    const res = await toast.promise(request, {
      pending: "處理中...",
      success: "會簽完成",
      error: "會簽失敗",
    });
    // console.log("會簽元件", res);

    afterSign();
  }
  return {
    sign,
    updateFormStatus,
    otherSign,
  };
};
