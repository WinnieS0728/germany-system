import api from "@/api";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useId2event = () => {
  const { i18n } = useTranslation();
  const nowLang = i18n.language;
  const getEvent = useCallback(
    (id: string) => {
      return (async function () {
        const res = await api.getEvent("TripEvent");
        const target = res.find((item) => item.ResourcesId === id);
        if (nowLang === "en") {
          return target?.ResourcesName_E;
        } else {
          return target?.ResourcesName;
        }
      })();
    },
    [nowLang]
  );

  return { id2event: getEvent };
};
