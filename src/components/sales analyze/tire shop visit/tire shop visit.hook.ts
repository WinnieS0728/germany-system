import api from "@/api";
import { tireShopVisit } from "@/api/sales analyze/tire shop visit";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { queryStatus } from "@/types";
import { getMonthArray } from "@/utils/get month_MM array";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type dataSet = {
    EmpName: string,
    allData: number[],
    newCus: number[],
    existCus: number[]
}

interface tireShopVisitReturn extends queryStatus {
    tsVisitData: dataSet[]
}

export function useTSVisit(): tireShopVisitReturn {
    const salesList = useAppSelector(state => state.salesList).body
    const { thisYear } = useAppSelector(state => state.time)
    const search = useSearchParams()[0]

    const { id2name } = useId2name()

    const search_month = search.get('month')
    const search_EmpId = search.get('EmpId')

    const monthList = getMonthArray(search_month)

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["tireShopVisit", { type: 'all' }, search_month],
        queryFn: async () => {
            const tireShopVisitData = await Promise.all(salesList.map(async (member) => {
                const visitData = (await getTSVisit()).filter(data => data.vqty > 0).filter(data => data.Empname === member.EmpName)

                const dataSet = {
                    EmpName: visitData[0].Empname,
                    allData: getTableValue(visitData),
                    newCus: getTableValue(visitData.filter(data => data.Oqty <= 1)),
                    existCus: getTableValue(visitData.filter(data => data.Oqty > 1)),
                }

                return dataSet
            }))

            if (search_EmpId) {
                const EmpName = await id2name(search_EmpId)
                return tireShopVisitData.filter(data => data.EmpName === EmpName)
            }
            return tireShopVisitData
        }
    })

    if (isPending) {
        return {
            status: 'pending',
            tsVisitData: []
        }
    }
    if (isError) {
        return {
            status: 'error',
            tsVisitData: [],
            message: error.message
        }
    }

    return {
        status: 'success',
        tsVisitData: data,
    }


    function getTableValue(dataArray: tireShopVisit): number[] {
        const storeNumber = dataArray.length
        const orderNumber = dataArray.map(data => data.Oqty).reduce((a, b) => a + b, 0)
        const txNumber = dataArray.map(data => data.SumQty).reduce((a, b) => a + b, 0)

        return [storeNumber, orderNumber, txNumber]
    }


    async function getTSVisit() {
        if (monthList) {
            const visitData = (await Promise.all(monthList.map(async (month) => api.getTireShopVisit({
                year: thisYear,
                month
            })))).reduce((a, b) => a.concat(b), [])


            const tsVisit_all = visitData.map(data => {
                const tx_sum = visitData.filter(data2 => data2.CustId === data.CustId).map(data => data.SumQty).reduce((a, b) => a + b, 0)

                const visit_sum = visitData.filter(data2 => data2.CustId === data.CustId).map(data => data.vqty).reduce((a, b) => a + b, 0)

                const order_sum = visitData.filter(data2 => data2.CustId === data.CustId).map(data => data.Oqty).reduce((a, b) => a + b, 0)

                return {
                    ...data,
                    SumQty: tx_sum,
                    vqty: visit_sum,
                    Oqty: order_sum
                }
            })

            const onlyId = [...new Set(tsVisit_all.map(data => data.CustId))]

            const dataSet = onlyId.map(id => tsVisit_all.find(data => data.CustId === id) as tireShopVisit[number])

            return dataSet
        } else {
            const visitData = await api.getTireShopVisit({
                year: thisYear,
            })

            return visitData
        }
    }
}