import { SettingSubmitBtn } from "@/components/UI/buttons";
import { Main } from "./main";
import { useTranslation } from "react-i18next";

export type formId = "tx" | "threshold";

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
            text={t("buttons.save")}
          />
          {children}
        </>
      </Main>
    </>
  );
}
