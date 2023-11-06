import api from "@/api";
import { getMonthArray } from "@/utils/get month_MM array";
import { useAppSelector } from "@data/store";
import { useQueries } from "@tanstack/react-query";
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
}

interface returnType {
    status: 'pending' | 'error' | 'success',
    salesRankData: salesRankType[]
}

export function useSalesRank(): returnType {
    const salesList = useAppSelector(state => state.salesList).body;
    const { thisYear } = useAppSelector(state => state.time);
    const [search] = useSearchParams()
    const searchMonth = search.get('month')
    const searchEmpId = search.get("EmpId")

    const month = getMonthArray(searchMonth);

    const salesRankQueries = useQueries({
        queries: month ? month.map((month) => ({
            queryKey: ["salesRank", `month-${month}`],
            queryFn: () => Promise.all(salesList.map(async (member) => api.getSalesQty({
                EmpId: member.EmpId,
                year: thisYear,
                month: month
            })))
        })) : [{
            queryKey: ["salesRank", 'fullYear'],
            queryFn: () => Promise.all(salesList.map(async (member) => await api.getSalesQty({
                EmpId: member.EmpId,
                year: thisYear,
            })))
        }]
    })

    if (salesRankQueries.some(query => query.isLoading)) {
        return { status: 'pending', salesRankData: [] }
    } else if (salesRankQueries.some(query => query.isError)) {
        return { status: 'error', salesRankData: [] }
    }
    const salesRankRes = salesRankQueries.map(query => query.data as NonNullable<typeof query.data>).reduce((a, b) => a.concat(b), [])

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

    const data = salesRankData.map((data) => {
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
        }
    }).sort((a, b) => b.tx - a.tx)

    if (searchEmpId) {
        return { status: 'success', salesRankData: data.filter(data => data.EmpId === searchEmpId) }
    } else {
        return { status: 'success', salesRankData: data }
    }

}