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

    const atuVisitQuery = useQuery({
        queryKey: ['overview', 'atuVisit',{type: "list"}],
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
                const visitList = (await api.getCusVisitList(data.Custid)).sort((a, b) => new Date(b.StartDT).getTime() - new Date(a.StartDT).getTime())

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

            return atuVisit
        }
    })

    const { data: EmpName } = useQuery({
        queryKey: ["overview", 'atuVisit', search_EmpId],
        enabled: !!search_EmpId,
        queryFn: () => id2name(search_EmpId as string),
    })

    if (atuVisitQuery.isPending) {
        return {
            status: 'pending',
            visitData: [],
            indexArray: []
        }
    }
    if (atuVisitQuery.isError) {
        return {
            status: 'error',
            message: atuVisitQuery.error.message,
            visitData: [],
            indexArray: []
        }
    }

    const maxLength = atuVisitQuery.data.sort(
        (a, b) => b.visitList.length - a.visitList.length
    )[0]?.visitList.length;

    const visitData_fullData = atuVisitQuery.data.map((data) => ({
        ...data,
        visitList: addEmptyData(data.visitList, maxLength),
    })).sort((a, b) => new Date(b.visitList[0].StartDT).getTime() - new Date(a.visitList[0].StartDT).getTime())

    if (EmpName) {
        return {
            status: 'success',
            visitData: visitData_fullData.filter(data => data.EmpName === EmpName),
            indexArray: getIndexArray(maxLength)
        }
    }
    return {
        status: 'success',
        visitData: visitData_fullData,
        indexArray: getIndexArray(maxLength)
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