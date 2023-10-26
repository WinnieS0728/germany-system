import api from "@/api";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const useId2transportation = () => {
  const { i18n } = useTranslation();
  const nowLang = i18n.language;
  const getTransportation = useCallback(
    (id: string) => {
      return (async function () {
        const res = await api.getEvent("Traffic");
        const idArray = id.split(",");
        const transportationArray = (
          await Promise.all(
            idArray.map(async (id) => {
              const target = res.find((item) => item.ResourcesId === id);
              if (nowLang === "en") {
                return target?.ResourcesName_E;
              } else {
                return target?.ResourcesName;
              }
            })
          )
        ).join(",");
        return transportationArray;
      })();
    },
    [nowLang]
  );

  return { id2transportation: getTransportation };
};
