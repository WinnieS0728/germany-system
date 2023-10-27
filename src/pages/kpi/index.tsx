import { WeekTable } from "@/components/kpi/week table";
import { YearTable } from "@/components/kpi/year table";
import { JoyRide } from "@/layouts/joyride";
import { Main } from "@/layouts/main";
import { Section } from "@/layouts/section";
import { Header } from "@layouts/header";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Step } from "react-joyride";

const CustomRatePage = () => {
  const { t } = useTranslation(["customRatePage", "joyride"]);
  const [JoyActive, setJoyActive] = useState(false);
  const steps: Step[] = [
    {
      title: t("ratePage.step1.title", { ns: "joyride" }),
      target: "#joy-ratePage-1",
      content: "",
      disableBeacon: true,
    },
    {
      title: t("ratePage.step2.title", { ns: "joyride" }),
      target: "#joy-ratePage-2",
      content: t("ratePage.step2.content", { ns: "joyride" }),
      disableBeacon: true,
    },
  ];

  <button
    type='button'
    className="className='m-0 w-8' aspect-square rounded-full bg-yellow-500 p-0"
    onClick={() => {
      setJoyActive(true);
    }}
  >
    ?
  </button>;

  return (
    <>
      <JoyRide
        steps={steps}
        active={JoyActive}
        restart={() => {
          setJoyActive(false);
        }}
      />
      <Header
        title={t("pageTitle")}
        showJoyride
        joyrideStart={() => {
          setJoyActive(true);
        }}
      />
      <Main>
        <>
          <Section>
            <YearTable />
          </Section>
          <Section>
            <WeekTable />
          </Section>
          <scroll-to-top />
        </>
      </Main>
    </>
  );
};

export default CustomRatePage;
