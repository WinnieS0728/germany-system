import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export type statusStringType = "已完簽" | "簽核中" | "作廢" | "退簽" | "未簽核";

export type statusNumberType = 0 | 1 | 3 | 4 | 5;
export const useSignStatusTranslate = () => {
  const { t } = useTranslation("common");

  const getFormStatus = useCallback(
    (status: statusStringType): string => {
      switch (status) {
        case "未簽核":
          return t("signStatus.no");
        case "簽核中":
          return t("signStatus.ing");
        case "已完簽":
          return t("signStatus.done");
        case "退簽":
          return t("signStatus.return");
        case "作廢":
          return t("signStatus.void");
        default:
          return t("signStatus.ing");
      }
    },
    [t]
  );

  const getSignStatus = useCallback(
    (status: statusNumberType): string => {
      switch (status) {
        case 0:
          return t("signStatus.no");
        case 1:
          return t("signStatus.agree");
        case 3:
          return t("signStatus.return");
        case 4:
          return t("signStatus.void");
        case 5:
          return "";
        default:
          return t("signStatus.no");
      }
    },
    [t]
  );

  return { getFormStatus, getSignStatus };
};
