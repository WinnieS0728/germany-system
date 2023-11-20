import api from "@/api";
import { cusVisitList_res } from "@/api/sales analyze/custom visit list";
import { tireShopVisit } from "@/api/sales analyze/tire shop visit";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { queryStatus } from "@/types";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMonthArray } from "@/utils/get month_MM array";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type tsVisitList = tireShopVisit[number] & {
    visitDateList: cusVisitList_res,
}

interface useTSVisitList extends queryStatus {
    tsVisitList: tsVisitList[],
    indexArray: number[]
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
                const visitDateList = (await getVisitDateList(data.CustId)).map(date => ({
                    ...date,
                    date: dateFormatter(date.StartDT),
                }))

                return {
                    ...data,
                    visitDateList
                }
            }))

            const maxLength = [...visitData].sort((a, b) => b.visitDateList.length - a.visitDateList.length)[0].visitDateList.length;

            const dataSet = visitData.map(data => ({
                ...data,
                visitDateList: pushEmptyData(data.visitDateList, maxLength)
            }))

            const indexArray: number[] = []

            for (let i = 0; i < maxLength; i++) {
                indexArray.push(i + 1)
            }

            if (search_EmpId) {
                const EmpName = await id2name(search_EmpId)
                return { dataSet: (dataSet).filter(data => data.Empname === EmpName), indexArray }
            }
            return { dataSet, indexArray }
        }
    })

    if (isPending) {
        return {
            status: 'pending',
            tsVisitList: [],
            indexArray: []
        }
    }

    if (isError) {
        return {
            status: 'error',
            tsVisitList: [],
            indexArray: [],
            message: error.message
        }
    }

    return {
        status: 'success',
        tsVisitList: data.dataSet,
        indexArray: data.indexArray
    }

    function pushEmptyData(array: cusVisitList_res, maxLength: number) {
        const newArray = [...array];

        for (let i = 0; i < maxLength - array.length; i++) {
            newArray.push({
                custname: '',
                StartDT: '',
                BTRId: ''
            })
        }

        return newArray
    }

    async function getVisitDateList(cusId: string) {
        const visitDateList = await api.getCusVisitList(cusId)

        if (visitDateList.length === 0) {
            return []
        }

        const thisYearDateList = visitDateList.filter(data => {
            const dataYear = data.StartDT.split('-')[0]
            return dataYear === thisYear ? true : false
        })

        if (monthList) {
            const inTheseMonthData = thisYearDateList.filter(data => {
                const dataMonth = data.StartDT.split('-')[1]
                return monthList.some(month => month === dataMonth)
            })
            

            return inTheseMonthData
        }
        
        return thisYearDateList
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