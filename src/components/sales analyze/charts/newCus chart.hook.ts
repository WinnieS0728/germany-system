import { useAppSelector } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { monthList } from "./monthList";
import api from "@/api";
import { tireShopVisit } from "@/api/sales analyze/tire shop visit";
import { useId2name } from "@/hooks/id2name";

type getTSVisitData_req = {
    year: string,
    month?: string,
    EmpId: string | null
}

export function useNewCusVisit() {
    const { thisYear } = useAppSelector(state => state.time)
    const { id2name } = useId2name()

    const search = useSearchParams()[0]
    const search_EmpId = search.get('EmpId')

    return useQuery({
        queryKey: ['visitData', 'newCus', search_EmpId],
        queryFn: async () => {
            const fullYearData = (await getTSVisitData({
                year: thisYear,
                EmpId: search_EmpId
            })).filter(data => data.Oqty === 1)

            const visitData = await Promise.all(monthList.map(async (month) => {
                return (await getTSVisitData({
                    year: thisYear,
                    month,
                    EmpId: search_EmpId
                })).filter(data => {
                    return fullYearData.find(yearData => yearData.CustId === data.CustId)
                }) as tireShopVisit
            }))

            const dataSet = visitData.map((monthData, index) => {
                const visit_sum = monthData.length
                const order_sum = monthData.filter(data => data.Oqty > 0).length

                return {
                    month: `${index + 1}月`,
                    visit_sum,
                    order_sum
                }
            })

            return dataSet
        }
    })
    async function getTSVisitData({
        year, month, EmpId
    }: getTSVisitData_req) {
        const res = (await api.getTireShopVisit({
            year: year,
            month: month
        })).filter(data => data.vqty > 0)

        if (EmpId) {
            const EmpName = await id2name(EmpId)
            return res.filter(data => data.Empname === EmpName)
        }

        return res
    }
}

