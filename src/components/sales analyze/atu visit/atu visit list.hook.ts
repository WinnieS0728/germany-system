import api from "@/api"
import { cusVisitList_res } from "@/api/sales analyze/custom visit list"
import { useAppSelector } from "@/data/store"
import { getMonthArray } from "@/utils/get month_MM array"
import { useSearchParams } from "react-router-dom"
import { useId2name } from "../../../hooks/id2name"
import { useQuery } from "@tanstack/react-query"
import { queryStatus } from "@/types"

type visitData = {
    id: number
    EmpName: string
    cusName: string
    payNumber: number,
    payThisWeek: undefined,
    visitNumber: number,
    visitList: cusVisitList_res,
}

interface atuVisitReturn extends queryStatus {
    visitData: visitData[],
    indexArray: number[]
}

export function useAtuVisit(): atuVisitReturn {
    const { thisYear } = useAppSelector(state => state.time)
    const { id2name } = useId2name()
    const search = useSearchParams()[0]

    const search_month = search.get('month')
    const search_EmpId = search.get('EmpId')

    const month = getMonthArray(search_month);

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['atuVisit', { type: "list" }, search_month, search_EmpId],
        queryFn: async () => {
            const res = month ? await Promise.all(month.map(async (month) => await api.getAtuVisit({
                year: thisYear,
                month: month
            }))) : [await api.getAtuVisit({
                year: thisYear,
            })]

            const dataSet = res.reduce((a, b) => a.concat(b), []).filter(data => data.Empname !== 'Marcus.Rosenzweig')

            const allData: typeof dataSet = dataSet.map((res) => {
                const sameCus = dataSet.filter((data) => data.Custid === res.Custid);
                const payNumber_sum = sameCus
                    .map((data) => data.Sqty)
                    .reduce((a, b) => a + b, 0);
                const visitNumber_sum = sameCus
                    .map((data) => data.vqty)
                    .reduce((a, b) => a + b, 0);
                return {
                    ...res,
                    Sqty: payNumber_sum,
                    vqty: visitNumber_sum,
                };
            }).filter(data => data.vqty !== 0);
            const onlyId = [...new Set(allData.map((data) => data.Custid))];

            const array = onlyId.map((id) => allData.find((data) => data.Custid === id)) as typeof dataSet

            const atuVisit: visitData[] = await Promise.all(array.map(async (data, index) => {
                const visitList = (await api.getCusVisitList(data.Custid)).sort((a, b) => new Date(b.StartDT).getTime() - new Date(a.StartDT).getTime()).filter(date => {
                    const dataYear = date.StartDT.split('-')[0]
                    const dataMonth = date.StartDT.split('-')[1]
                    if (month) {
                        return dataYear === thisYear && month.some(month => dataMonth === month)
                    }
                    return dataYear === thisYear
                })

                return {
                    id: index + 1,
                    EmpName: data.Empname,
                    cusName: data.Custname,
                    payNumber: data.Sqty,
                    payThisWeek: undefined,
                    visitNumber: data.vqty,
                    visitList,
                }
            }))

            const maxLength = atuVisit.sort((a, b) => b.visitList.length - a.visitList.length)[0].visitList.length

            const atuVisit_withEmptyData = atuVisit.map(data => ({
                ...data,
                visitList: addEmptyData(data.visitList, maxLength)
            }))

            const indexArray = getIndexArray(maxLength)

            if (search_EmpId) {
                const EmpName = await id2name(search_EmpId)
                return {
                    atuVisit: atuVisit_withEmptyData.filter(data => data.EmpName === EmpName),
                    indexArray
                }
            }

            return { atuVisit: atuVisit_withEmptyData, indexArray }
        }
    })

    if (isPending) {
        return {
            status: 'pending',
            visitData: [],
            indexArray: []
        }
    }
    if (isError) {
        return {
            status: 'error',
            message: error.message,
            visitData: [],
            indexArray: []
        }
    }

    return {
        status: 'success',
        visitData: data.atuVisit,
        indexArray: data.indexArray
    }

    function addEmptyData(array: cusVisitList_res, maxNumber: number) {
        const newArray = [...array];

        for (let i = 0; i < maxNumber - array.length; i++) {
            newArray.push({
                custname: '',
                StartDT: '',
                BTRId: ''
            });
        }

        return newArray;
    }

    function getIndexArray(maxNumber: number) {
        const array: number[] = []
        for (let i = 1; i <= maxNumber; i++) {
            array.push(i)
        }
        return array
    }
}