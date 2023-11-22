import { useTranslation } from "react-i18next";

export function useShouldTranslation() {
    const {
        i18n: { language },
    } = useTranslation();
    if (language === "en" && location.hash.startsWith("#/kpiSetting/threshold")) {
        return true;
    }
    return false;
}