import { useTranslation } from "react-i18next";
import Joyride, { Step } from "react-joyride";

interface propsType {
  steps: Step[];
  active: boolean;
  restart: () => void;
}

export const JoyRide = ({ steps, active, restart }: propsType) => {
  window.global ||= window;
  const { t } = useTranslation(["joyride"]);
  return (
    <>
      <Joyride
        steps={steps}
        run={active}
        continuous
        scrollToFirstStep
        // showProgress
        showSkipButton
        hideCloseButton
        disableOverlayClose={true}
        locale={{
          back: t("btn.prev"),
          next: t("btn.next"),
          last: t("btn.done"),
          skip: t("btn.skip"),
        }}
        callback={(d) => {
          if (d.action === "reset" || d.action === "close") {
            restart();
          }
        }}
      />
    </>
  );
};
