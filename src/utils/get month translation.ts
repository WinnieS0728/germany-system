import { monthList } from "@/components/fuck/sales analyze/charts/monthList";
import { month_shortName } from "@/types";

export function getTranslationMonth(language: string, monthIndex: number): string {
    if (language === 'en') {
        return month_shortName[monthIndex]
    } else {
        return `${Number(monthList[monthIndex])}月`
    }
}