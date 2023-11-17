import { useAppSelector } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { monthList } from "./monthList";
import api from "@/api";
import { useId2name } from "@/hooks/id2name";

export function useAtuChart() {
    const { thisYear } = useAppSelector(state => state.time)
    const salesList = useAppSelector(state => state.salesList.body)
    const { id2name } = useId2name()

    const search = useSearchParams()[0]
    const search_EmpId = search.get('EmpId')

    return useQuery({
        queryKey: ['charts', 'atuVisit', search_EmpId],
        queryFn: async () => {
            const atuVisit = await Promise.all(monthList.map(async (month) => {
                return await Promise.all(salesList.map(async (member) => {
                    const atuVisitData = await getAtuVisitData(thisYear, month, member.EmpId)
                    
                    return {
                        visit_sum: atuVisitData.filter(data => data.vqty > 0).length,
                        payment_sum: atuVisitData.filter(data => data.vqty > 0 && data.Sqty > 0).length,
                    }
                }))
            }))

            const dataSet = atuVisit.map((atuVisitData, index) => {
                const visit_sum = atuVisitData.map(data => data.visit_sum).reduce((a, b) => a + b, 0)
                const payment_sum = atuVisitData.map(data => data.payment_sum).reduce((a, b) => a + b, 0)

                return {
                    month: `${Number(index + 1)}月`,
                    visit_sum,
                    payment_sum
                }
            })

            return dataSet
        }
    })


    async function getAtuVisitData(year: string, month: string, EmpId: string) {
        const EmpName = await id2name(EmpId)
        const res = (await api.getAtuVisit({
            year, month
        })).filter(data => data.Empname === EmpName)

        return res
    }
    async function getAtuPaymentData(year: string, month: string, EmpId: string) {
        const EmpName = await id2name(EmpId)
        const res = (await api.getAtuPayment(year)).filter(data => data.MM === Number(month) && data.Empname === EmpName)

        return res
    }
}
