import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

import common_en from "@locales/common/en.json"
import customRatePage_en from "@locales/custom rate page/en.json"
import settingPage_en from "@locales/setting page/en.json"
import joyride_en from "@locales/joyride/en.json"

import common_tw from "@locales/common/zh.json"
import customRatePage_tw from "@locales/custom rate page/zh.json"
import settingPage_tw from "@locales/setting page/zh.json"
import joyride_tw from "@locales/joyride/zh.json"


import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    common: common_en,
    customRatePage: customRatePage_en,
    settingPage: settingPage_en,
    joyride: joyride_en,
  },
  zh_tw: {
    common: common_tw,
    customRatePage: customRatePage_tw,
    settingPage: settingPage_tw,
    joyride: joyride_tw,
  },
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // backend: {
    //   loadPath: "/locales/{{lng}}/{{ns}}.json",
    // },
    // debug: true,
    resources,
    // lng: "zh_tw",
    fallbackLng: "zh_tw",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
