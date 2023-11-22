import { SettingSubmitBtn } from "@/components/UI/buttons";
import { Main } from "../../../layouts/main";
import { useTranslation } from "react-i18next";
import { useShouldTranslation } from "@/utils/kpi setting should translation";

export type formId = "tx" | "threshold" | "store" | "osom";

interface props {
  formId: formId;
  children: JSX.Element;
}

export function SettingLayout({ formId, children }: props) {
  const { t } = useTranslation("common");
  return (
    <>
      <Main>
        <>
          <SettingSubmitBtn
            formId={formId}
            text={t("buttons.save", {
              lng: useShouldTranslation() ? "en" : "zh"
            })}
          />
          {children}
        </>
      </Main>
    </>
  );
}
