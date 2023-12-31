import api from "@/api";
import { useAppSelector } from "@/data/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { monthList } from "./monthList";
import { month_shortName } from "@/types";
import { useTranslation } from "react-i18next";

export function useSalesChart() {
    const { i18n: { language } } = useTranslation()

    const { thisYear } = useAppSelector(state => state.time)
    const salesList = useAppSelector(state => state.salesList).body

    const search = useSearchParams()[0]
    const search_EmpId = search.get('EmpId')

    return useQuery({
        queryKey: ['charts', 'salesRank', search_EmpId],
        queryFn: async () => {
            const salesRank = await Promise.all(monthList.map(async (month) => {
                const allSales_salesRank = await Promise.all(salesList.map(async (member) => {
                    const salesNumber = await getSalesNumbers(member.EmpId, thisYear, month)

                    return salesNumber
                }))
                if (search_EmpId) {
                    return allSales_salesRank.filter(data => data.cu_sale === search_EmpId)
                }
                return allSales_salesRank
            }))


            const dataSet = salesRank.map((dataArray, index) => {
                const tx_sum = dataArray.map(data => data.sqty).reduce((a, b) => a + b, 0)
                const order_sum = dataArray.map(data => data.oqty).reduce((a, b) => a + b, 0)

                return {
                    month: language === 'en' ? month_shortName[index] : `${Number(index + 1)}月`,
                    tx_sum,
                    order_sum
                }
            })

            return dataSet
        }
    })

    async function getSalesNumbers(EmpId: string, year: string, month: string) {
        const salesRank = (await api.getSalesQty({
            EmpId, year, month
        }))[0]

        return salesRank || {
            cu_sale: EmpId,
            pa_ena: "",
            ogqty: 0,
            sqty: 0,
            oqty: 0,
            cqty: 0,
        }
    }
}