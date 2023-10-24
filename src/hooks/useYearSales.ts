import api from "@/api";
import { Month_MM } from "@/const";
import { useAppSelector } from "@/data/store";
import { getPercent } from "@/utils/get percent";
import { useCallback, useEffect, useState } from "react";
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


export function useYearSales() {
    const salesList = useAppSelector(state => state.salesList).body
    const { thisYear } = useAppSelector(state => state.time)
    const [search] = useSearchParams()
    const year = search.get('year')
    const EmpId = search.get("EmpId")

    const [data, setData] = useState<data[]>([])

    const getTxNumber = useCallback(async (EmpId: string, month: string) => {
        const res = await api.getSalesQty({
            EmpId,
            year: year || thisYear,
            month
        })

        return res?.sqty || 0
    }, [thisYear, year])

    const getTxThreshold = useCallback(async (EmpId: string) => {
        const res = await api.tx.fetch(year || thisYear, EmpId)

        return [
            Number(res[0]?.Jan) || 0,
            Number(res[0]?.Feb) || 0,
            Number(res[0]?.Mar) || 0,
            Number(res[0]?.Apr) || 0
        ]
    }, [thisYear, year])

    useEffect(() => {
        (async function () {
            const data = await Promise.all(salesList.map(async (member) => {
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

            setData(data)
        })()
    }, [getTxNumber, getTxThreshold, salesList])

    if (EmpId) {
        return data.filter(data => data.id === EmpId)
    }

    return data
}