import { useAppSelector } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { monthList } from "./monthList";
import api from "@/api";
import { useId2name } from "@/hooks/id2name";

export function useOsomChart() {
    const { thisYear } = useAppSelector(state => state.time)
    const salesList = useAppSelector(state => state.salesList).body
    const { id2name } = useId2name()
    const search = useSearchParams()[0]
    const search_EmpId = search.get('EmpId')

    return useQuery({
        queryKey: ['charts', 'osom', search_EmpId],
        queryFn: async () => {
            const osomData = await Promise.all(monthList.map(async (month) => {
                const salesOsomData = await Promise.all(salesList.map(async (member) => {
                    const data = await getOsomData(thisYear, month, member.EmpName)
                    return data
                }))

                if (search_EmpId) {
                    const EmpName = await id2name(search_EmpId)
                    return salesOsomData.filter(data => data.empname === EmpName)
                }

                return salesOsomData
            }))

            const dataSet = osomData.map((data, index) => {
                const login_sum = data.map(data => data.LogQty).reduce((a, b) => a + b, 0)
                const signUp_sum = data.map(data => data.CoQty).reduce((a, b) => a + b, 0)

                return {
                    month: `${index + 1}月`,
                    login_sum,
                    signUp_sum
                }
            })

            return dataSet
        }
    })

    async function getOsomData(year: string, month: string, EmpName: string) {
        const res = (await api.getKpiNumber({
            year, month
        }))

        return res.find(data => data.empname === EmpName) || {
            empname: EmpName,
            CoQty: 0,
            LpQty: 0,
            LogQty: 0,
        }
    }
}

