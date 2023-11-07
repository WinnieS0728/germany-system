import api from "@/api";
import { Month_MM } from "@/const";
import { useAppSelector } from "@/data/store";
import { queryStatus } from "@/types";
import { getPercent } from "@/utils/get percent";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type data = {
    id: string,
    name: string,
    txNumber: number[],
    txNumber_season: number[],
    txThreshold: number[],
    salesRate: number[],
    total: number
}

interface yearSalesReturn extends queryStatus {
    yearSalesData: data[]
}


export function useYearSales(): yearSalesReturn {
    const salesList = useAppSelector(state => state.salesList).body
    const { thisYear } = useAppSelector(state => state.time)
    const search = useSearchParams()[0]
    const search_year = search.get('year')
    const search_EmpId = search.get("EmpId")

    const { data, isPending, isError } = useQuery({
        queryKey: ['overview', 'yearSales'],
        queryFn: () => {
            const data = Promise.all(salesList.map(async (member) => {
                const txNumber = await Promise.all(Month_MM.map(async (month) => {
                    return await getTxNumber(member.EmpId, month)
                }))

                const txNumber_season = [
                    txNumber.slice(0, 3).reduce((a, b) => a + b, 0),
                    txNumber.slice(3, 6).reduce((a, b) => a + b, 0),
                    txNumber.slice(6, 9).reduce((a, b) => a + b, 0),
                    txNumber.slice(9, 12).reduce((a, b) => a + b, 0)
                ]

                const txThreshold = await getTxThreshold(member.EmpId)

                const salesRate = Object.values(txNumber_season).map((number, index) => {
                    const thresholdArray = Object.values(txThreshold)
                    return getPercent(number, thresholdArray[index])
                })

                const total = txNumber.reduce((a, b) => a + b, 0)

                return {
                    id: member.EmpId,
                    name: member.EmpName,
                    txNumber_season,
                    txNumber,
                    txThreshold,
                    salesRate,
                    total
                }
            }))
            return data
        }
    })

    if (isPending) {
        return {
            status: 'pending',
            yearSalesData: []
        }
    } else if (isError) {
        return {
            status: 'error',
            yearSalesData: []
        }
    }

    if (search_EmpId) {
        return {
            status: 'success',
            yearSalesData: data.filter(data => data.id === search_EmpId)
        }
    }
    return {
        status: 'success',
        yearSalesData: data
    }

    async function getTxNumber(EmpId: string, month: string) {
        const res = await api.getSalesQty({
            EmpId,
            year: search_year || thisYear,
            month
        })

        return res?.sqty || 0
    }

    async function getTxThreshold(EmpId: string) {
        const res = await api.tx.fetch(search_year || thisYear, EmpId)

        return [
            Number(res[0]?.Jan) || 0,
            Number(res[0]?.Feb) || 0,
            Number(res[0]?.Mar) || 0,
            Number(res[0]?.Apr) || 0
        ]
    }


}