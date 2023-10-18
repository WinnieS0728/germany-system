import api from "@/api";
import { useAppSelector } from "../utils/redux";
import { useEffect, useState } from "react";

type salesRankType = {
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
    const salesList = useAppSelector(state => state.salesList).body
    const { thisYear, thisMonth } = useAppSelector(state => state.time)

    const [data, setData] = useState<salesRankType[]>([])

    useEffect(() => {
        (async function () {
            const data = await Promise.all(salesList.map(async (member) => {
                const salesQty = await api.getSalesQty({
                    EmpId: member.EmpId,
                    year: thisYear,
                    month: thisMonth
                })
                return {
                    name: salesQty.pa_ena,
                    tx: salesQty.sqty,
                    og: salesQty.ogqty,
                    total: salesQty.oqty,
                    first_order: salesQty.cqty,
                    first_order_rate: salesQty.cqty / salesQty.oqty * 100,
                    other_order: salesQty.oqty - salesQty.cqty,
                    other_order_rate: (salesQty.oqty - salesQty.cqty) / salesQty.oqty * 100,
                    atu: 0
                }
            }))

            setData(data.sort((a, b) => b.tx - a.tx))
        })()
    }, [salesList, thisMonth, thisYear])

    return data
}