import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend, { HttpBackendOptions } from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    load: "languageOnly",
    backend: {
      loadPath: "./locales/{{ns}}/{{lng}}.json",
    },
    // debug: true,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
