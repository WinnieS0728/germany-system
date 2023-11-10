import api from "@/api";
import { tireShopVisit } from "@/api/sales analyze/tire shop visit";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { queryStatus } from "@/types";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMonthArray } from "@/utils/get month_MM array";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type tsVisitList = tireShopVisit[number] & {
    visitDateList: string[]
}

interface useTSVisitList extends queryStatus {
    tsVisitList: tsVisitList[]
}

export function useTSVisitList(): useTSVisitList {
    const { thisYear } = useAppSelector(state => state.time)

    const search = useSearchParams()[0]
    const search_month = search.get('month')
    const search_EmpId = search.get('EmpId')
    const { id2name } = useId2name()

    const monthList = getMonthArray(search_month)

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['tireShopVisit', { type: 'list' }, monthList, search_EmpId],
        queryFn: async () => {
            const visitData = await Promise.all((await getTSVisit()).filter(data => data.vqty !== 0).map(async (data) => {
                const visitDateList = Object.values((await api.getTireShopVisitList(data.CustId))[0]).slice(1).map(date => dateFormatter(date))

                return {
                    ...data,
                    visitDateList
                }
            }))




            if (search_EmpId) {
                const EmpName = await id2name(search_EmpId)
                return (visitData).filter(data => data.Empname === EmpName)
            }
            return visitData
        }
    })

    if (isPending) {
        return {
            status: 'pending',
            tsVisitList: []
        }
    }

    if (isError) {
        return {
            status: 'error',
            tsVisitList: [],
            message: error.message
        }
    }    

    return {
        status: 'success',
        tsVisitList: data
    }


    async function getTSVisit() {
        if (monthList) {
            const visitData = (await Promise.all(monthList.map(async (month) => api.getTireShopVisit({
                year: thisYear,
                month
            })))).reduce((a, b) => a.concat(b), [])

            console.log(visitData);


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