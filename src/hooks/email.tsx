import { useTranslation } from "react-i18next";
import { useAppSelector } from "./redux";
import api from "@/lib/api";
import { useCallback, useEffect, useMemo, useState } from "react";
import { memberResType } from "@/lib/api/member/getMember";
import { useSignPageData } from "@/pages/sign/data";

export const useEmail = () => {
  const [lang, setLang] = useState<memberResType["Language"]>("en-US");
  const [recipient, setRecipient] = useState<string>("");
  const { t } = useTranslation("email", {
    lng: lang.split("-")[0],
  });
  const { formId, nowOrder, signList } = useAppSelector(
    (state) => state.formInfo
  ).body;
  const { headData } = useSignPageData();
  const createName = headData.EmpName;

  const nextSigner = signList.find(
    (member) => member.SIGNORDER === nowOrder + 1
  )?.SIGNER;

  const getLang = useCallback((EmpId: string) => {
    (async function () {
      const res = await api.getMember(EmpId);
      const usingLang = res[0].Language;
      setLang(usingLang);
    })();
  }, []);

  useEffect(() => {
    if (!nextSigner) {
      getLang(signList[0]?.SIGNER);
      setRecipient(signList[0]?.SIGNER);
    } else {
      getLang(nextSigner);
      setRecipient(nextSigner);
    }
  }, [getLang, nextSigner, signList]);

  const getEmailData: () => emailData = useCallback(() => {
    return {
      formId: formId,
      createName: createName,
      link: `https://esys.orange-electronic.com/ODF/Sales_Travel?id=TravelAppDe&formN=index`,
    };
  }, [createName, formId]);

  const email: email = useMemo(
    () => ({
      done: {
        Sub: t("done.title", getEmailData()),
        Messg: t("done.content", getEmailData()),
      },
      wait: {
        Sub: t("wait.title", getEmailData()),
        Messg: t("wait.content", getEmailData()),
      },
      other: {
        Sub: t("other.title", getEmailData()),
        Messg: t("other.content", getEmailData()),
      },
      return: {
        Sub: t("return.title", getEmailData()),
        Messg: t("return.content", getEmailData()),
      },
    }),
    [getEmailData, t]
  );

  const sendEmail = useCallback(
    (type: emailType) => {
      api.sendEmail(recipient, email[`${type}`]);
    },
    [email, recipient]
  );

  return { sendEmail };
};

type emailType = "done" | "wait" | "other" | "return";
type emailContent = {
  Sub: string;
  Messg: string;
};
type email = Record<emailType, emailContent>;

type emailData = {
  formId: string;
  createName: string;
  link: string;
};
