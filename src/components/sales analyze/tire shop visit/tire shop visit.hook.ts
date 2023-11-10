import api from "@/api";
import { tireShopVisit } from "@/api/sales analyze/tire shop visit";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { queryStatus } from "@/types";
import { getMonthArray } from "@/utils/get month_MM array";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type dataSet = {
    EmpName: string,
    allData: number[],
    firstVisit: number[],
    multiVisit: number[]
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

    const EmpQuery = useQuery({
        queryKey: ['id2name', search_EmpId],
        enabled: !search_EmpId,
        queryFn: () => id2name(search_EmpId as string),
    })

    const monthList = getMonthArray(search_month)

    const tireShopQueries = useQueries({
        queries: salesList.map(member => ({
            queryKey: ["tireShopVisit", { type: 'all' }, search_month, member.EmpId],
            queryFn: async () => {
                const visitData = (await getTSVisit()).filter(data => data.Empname === member.EmpName)

                const dataSet = {
                    EmpName: visitData[0].Empname,
                    allData: getTableValue(visitData),
                    firstVisit: getTableValue(visitData.filter(data => !data.ErpNo)),
                    multiVisit: getTableValue(visitData.filter(data => data.ErpNo)),
                }

                return dataSet
            }
        }))
    })

    if (tireShopQueries.some(query => query.isPending) || EmpQuery.isPending) {
        return {
            status: 'pending',
            tsVisitData: []
        }
    }
    if (tireShopQueries.some(query => query.isError) || EmpQuery.isError) {
        return {
            status: 'error',
            tsVisitData: [],
            message: tireShopQueries.find(query => query.isError)?.error?.message
        }
    }

    if (EmpQuery.data) {
        return {
            status: 'success',
            tsVisitData: tireShopQueries.map(query => query.data as dataSet).filter(data => data.EmpName === EmpQuery.data),
        }
    }

    return {
        status: 'success',
        tsVisitData: tireShopQueries.map(query => query.data as dataSet),
    }


    function getTableValue(dataArray: tireShopVisit): number[] {
        const storeNumber = dataArray.length
        const txNumber = dataArray.map(data => data.SumQty).reduce((a, b) => a + b, 0)
        const visitNumber = dataArray.map(data => data.vqty).reduce((a, b) => a + b, 0)

        return [storeNumber, visitNumber, txNumber]
    }


    async function getTSVisit() {
        if (monthList) {
            const visitData = (await Promise.all(monthList.map(async (month) => api.getTireShopVisit({
                year: thisYear,
                month
            })))).reduce((a, b) => a.concat(b), [])

            const tsVisit_all = visitData.map(data => {
                const tx_sum = visitData.map(data => data.SumQty).reduce((a, b) => a + b, 0)
                const visit_sum = visitData.map(data => data.vqty).reduce((a, b) => a + b, 0)

                return {
                    ...data,
                    SumQty: tx_sum,
                    vqty: visit_sum
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