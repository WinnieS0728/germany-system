import api from "@/lib/api";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

export function useId2name() {
  const { i18n } = useTranslation();
  const nowLang = i18n.language;

  const getName = useCallback(
    (id: string) => {
      return (async function (): Promise<string> {
        const res = await api.getMember(id);
        if (nowLang === "en") {
          return res[0].FullName.split("/")[0];
        }
        return res[0].EmpName;
      })();
    },
    [nowLang]
  );

  return { id2name:getName };
}
