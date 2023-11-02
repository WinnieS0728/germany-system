import api from "@/api";
import { getMonthArray } from "@/utils/get month_MM array";
import { useAppSelector } from "@data/store";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

type salesRankType = {
    EmpId: string
    name: string,
    tx: number,
    og: number,
    total: number,
    first_order: number,
    first_order_rate: number,
    other_order: number,
    other_order_rate: number,
    atu: number
}

export function useSalesRank() {
    const salesList = useAppSelector(state => state.salesList).body;
    const { thisYear, thisMonth } = useAppSelector(state => state.time);
    const [search] = useSearchParams()    
    const searchMonth = search.get('month')
    const searchEmpId = search.get("EmpId")

    const [data, setData] = useState<salesRankType[]>([])

    useEffect(() => {
        const month = getMonthArray(searchMonth);

        (async function () {
            const salesRankRes = month
                ? (await Promise.all(month.map(async (month) =>
                    await Promise.all(salesList.map(async (member) => await api.getSalesQty({
                        EmpId: member.EmpId,
                        year: thisYear,
                        month: month
                    })))
                ))).reduce((a, b) => a.concat(b), []).filter(data => data)
                : await Promise.all(salesList.map(async (member) => await api.getSalesQty({
                    EmpId: member.EmpId,
                    year: thisYear,
                })))

            const allData = salesRankRes.map(res => {
                const sameCus = salesRankRes.filter(data => data.cu_sale === res.cu_sale)
                const tx_sum = sameCus.map(data => data.sqty).reduce((a, b) => a + b, 0)
                const og_sum = sameCus.map(data => data.ogqty).reduce((a, b) => a + b, 0)
                const total_sum = sameCus.map(data => data.oqty).reduce((a, b) => a + b, 0)
                const firstOrder_sum = sameCus.map(data => data.cqty).reduce((a, b) => a + b, 0)

                return {
                    ...res,
                    sqty: tx_sum,
                    ogqty: og_sum,
                    oqty: total_sum,
                    cqty: firstOrder_sum
                }
            })

            const onlyId = [...new Set(allData.map(data => data.cu_sale))]

            const salesRankData = onlyId.map(id => allData.find(data => data.cu_sale === id)) as typeof salesRankRes

            const data = (await Promise.all(salesRankData.map(async (data) => {
                return {
                    EmpId: data.cu_sale,
                    name: data.pa_ena,
                    tx: data.sqty,
                    og: data.ogqty,
                    total: data.oqty,
                    first_order: data.cqty,
                    first_order_rate: data.cqty / data.oqty * 100,
                    other_order: data.oqty - data.cqty,
                    other_order_rate: (data.oqty - data.cqty) / data.oqty * 100,
                    atu: 0
                }
            }))).sort((a, b) => b.tx - a.tx)

            if (searchEmpId) {
                setData(data.filter(data => data.EmpId === searchEmpId))
            } else {
                setData(data)
            }

        })()
    }, [salesList, searchEmpId, searchMonth, thisMonth, thisYear])

    return data
}