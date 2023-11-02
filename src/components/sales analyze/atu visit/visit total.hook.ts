import api from "@/api"
import { atuVisit_res } from "@/api/sales analyze/atu visit"
import { useAppSelector } from "@/data/store"
import { getMonthArray } from "@/utils/get month_MM array"
import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

export type atuVisitTableData = {
    storeNumber: number,
    payNumber: number,
    txNumber: number
}

type atuVisitData = {
    EmpId: string,
    EmpName: string,
    totalData: atuVisitTableData,
    hasVisitData: atuVisitTableData,
    firstVisitData: atuVisitTableData,
    multiVisitData: atuVisitTableData
}


export function useAtuVisitTotal() {
    const salesList = useAppSelector(state => state.salesList).body

    const { thisYear } = useAppSelector(state => state.time)
    const search = useSearchParams()[0]
    const search_month = search.get('month')
    const search_EmpId = search.get('EmpId')

    const [atuVisitData, setAtuVisitData] = useState<atuVisitData[]>([])

    const getSalesVisitData = useCallback(async (EmpName: string) => {
        const month = getMonthArray(search_month)
        if (!month) {
            const res = await api.getAtuVisit({
                year: thisYear,
            })

            const dataSet = res.filter(data => data.Empname === EmpName)

            return dataSet
        } else {
            const res = (await Promise.all(month.map(async (month) => await api.getAtuVisit({
                year: thisYear,
                month
            })))).reduce((a, b) => a.concat(b), [])

            const onlyId = [...new Set(res.map(data => data.Custid))]

            const dataSet = onlyId.map(id => res.find(data => data.Custid === id)) as typeof res

            return dataSet.filter(data => data.Empname === EmpName)
        }

    }, [search_month, thisYear])

    const getTableData = useCallback(async (visitData: atuVisit_res) => {
        const storeNumber = visitData.length
        const payNumber = visitData.filter(data => data.Sqty !== 0).length
        const txNumber = visitData.map(data => data.Sqty).reduce((a, b) => a + b, 0)

        return {
            storeNumber,
            payNumber,
            txNumber
        }
    }, [])

    useEffect(() => {
        (async function () {
            const salesVisitData = await Promise.all(salesList.map(async (sales) => {
                const thisSalesVisitData = await getSalesVisitData(sales.EmpName)
                const totalData = await getTableData(thisSalesVisitData)

                const hasVisitData = await getTableData(thisSalesVisitData.filter(data => data.vqty !== 0))

                const firstVisitData = await getTableData(thisSalesVisitData.filter(data => data.vqty === 1))

                const multiVisitData = await getTableData(thisSalesVisitData.filter(data => data.vqty > 1))

                return {
                    EmpId: sales.EmpId,
                    EmpName: sales.EmpName,
                    totalData,
                    hasVisitData,
                    firstVisitData,
                    multiVisitData
                }
            }))

            if (search_EmpId) {
                setAtuVisitData(salesVisitData.filter(data=>data.EmpId === search_EmpId))
            }else {
                setAtuVisitData(salesVisitData)
            }
        })()
    }, [getSalesVisitData, getTableData, salesList, search_EmpId])

    return atuVisitData
}