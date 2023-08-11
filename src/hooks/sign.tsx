import { useMemo } from "react";
import { useAppSelector } from "./redux";
import api from "@/lib/api";
import { signFinalDataType } from "@/lib/api/sign/update sign";
import { SignData } from "@/components/sign/sign box";
import { otherSignFinalDataType } from "@/lib/api/sign/post otherSign";
import { updateFormStatus } from "@/lib/api/travel apply/update form";

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
    if (agree === "delete") {
      data = {
        BTPId: formInfo.formId,
        Status: "4", // 作廢
        type: "1",
      };
    } else if (agree === "no") {
      data = {
        BTPId: formInfo.formId,
        Status: "3", // 退簽
        type: "1",
      };
    } else if (agree === "yes" && isFinalSigner) {
      data = {
        BTPId: formInfo.formId,
        Status: "2", // 完簽
        type: "1",
      };
    }
    if (!data) {
      return;
    }
    const res = await api.updateForm(data);
    console.log('表單狀態',res);
    
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

  function afterSign() {
    setTimeout(() => {
      location.reload();
    }, 3000);
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
    const res = await api.updateSignStatus(signFinalData);
    console.log("更新簽核狀態元件", res);
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

    const res = await api.postOtherSign(otherSignMemberList);
    console.log("會簽元件", res);
  }
  return {
    sign,
    updateFormStatus,
    otherSign,
  };
};
