import { useAppSelector } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { monthList } from "./monthList";
import api from "@/api";

export function useExistCusVisit() {
    const { thisYear } = useAppSelector(state => state.time)

    const search = useSearchParams()[0]
    const search_EmpId = search.get('EmpId')

    return useQuery({
        queryKey: ['visitData', 'existCus', search_EmpId],
        queryFn: async () => {
            const visitNumber = await Promise.all(monthList.map(async (month) => {
                const { existCus } = await getTSVisitData(thisYear, month)

                return {
                    month: `${Number(month)}月`,
                    visitNumber: existCus.length,
                    orderNumber: existCus.filter(data => data.Oqty).length
                }
            }))
            return visitNumber
        }
    })
}

async function getTSVisitData(year: string, month: string) {
    const res = (await api.getTireShopVisit({
        year: year,
        month: month
    })).filter(data => data.vqty > 0)

    const existCus = res.filter(data => data.Oqty > 1)
    const newCus = res.filter(data => data.Oqty <= 1)

    return { existCus, newCus }
}