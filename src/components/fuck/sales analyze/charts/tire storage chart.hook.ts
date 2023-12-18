import api from "@/api";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { monthList } from "./monthList";
import { month_shortName } from "@/types";
import { useTranslation } from "react-i18next";

type getTireStorageData_req = {
    year: string,
    month: string,
    EmpName: string
}

export function useTireStorageChart() {
    const { i18n: { language } } = useTranslation()

    const { thisYear } = useAppSelector(state => state.time)
    const salesList = useAppSelector(state => state.salesList).body
    const { id2name } = useId2name()

    const search = useSearchParams()[0]
    const search_EmpId = search.get('EmpId')

    return useQuery({
        queryKey: ['charts', 'tireStorage', search_EmpId],
        queryFn: async () => {
            const tsData = await Promise.all(monthList.map(async (month) => {
                const kpiNumberList = await Promise.all(salesList.map(async (member) => {
                    const kpiNumber = await getTireStorageData({
                        year: thisYear,
                        month,
                        EmpName: member.EmpName
                    })
                    return kpiNumber
                }))

                if (search_EmpId) {
                    const EmpName = await id2name(search_EmpId)
                    return kpiNumberList.filter(data => data.empname === EmpName)
                }
                return kpiNumberList
            }))

            const dataSet = tsData.map((dataList, index) => {
                const tireStorage_sum = dataList.map(data => data.LpQty).reduce((a, b) => a + b, 0)

                return {
                    month: language === 'en' ? month_shortName[index] : `${Number(index + 1)}月`,
                    tireStorage_sum,
                }
            })

            const d = dataSet.map((data, index) => {
                const prevNumber = dataSet[index - 1]?.tireStorage_sum || 0

                return {
                    ...data,
                    diff: data.tireStorage_sum - prevNumber
                }
            })


            return d
        }
    })

    async function getTireStorageData({ year, month, EmpName }: getTireStorageData_req) {
        const res = (await api.getKpiNumber({
            year, month
        })).find(data => data.empname === EmpName)

        return res || {
            empname: EmpName,
            CoQty: 0,
            LpQty: 0,
            LogQty: 0,
        }
    }
}