import api from "@/lib/api";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useId2transportation = () => {
  const { i18n } = useTranslation();
  const nowLang = i18n.language;
  const getTransportation = useCallback(
    (id: string) => {
      return (async function () {
        const res = await api.getEvent("Traffic");
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

  return { id2transportation: getTransportation };
};
