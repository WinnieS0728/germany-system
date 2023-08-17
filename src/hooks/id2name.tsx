import api from "@/lib/api";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

type splitNameType = {
  EmpId: string;
  EmpName: string;
  FullName: string;
} & Record<string, unknown>;
export function useId2name() {
  const { i18n, t } = useTranslation("sign page");
  const nowLang = i18n.language;

  const splitName = useCallback(
    (obj: splitNameType): string => {
      if (nowLang === "en") {
        return obj.FullName.split("/")[0];
      }
      return obj.EmpName;
    },
    [nowLang]
  );

  const getName = useCallback(
    (id: string) => {
      if (!id) {
        return t("noDeputy");
      }
      return (async function (): Promise<string> {
        const res = await api.getMember(id);
        return splitName(res[0]);
      })();
    },
    [splitName, t]
  );

  return { id2name: getName, splitName };
}
