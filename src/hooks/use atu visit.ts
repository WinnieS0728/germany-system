import api from "@/api"
import { cusVisitList_res } from "@/api/sales analyze/custom visit list"
import { useAppSelector } from "@/data/store"
import { getMonthArray } from "@/utils/get month_MM array"
import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useId2name } from "./id2name"

type visitData = {
    id: number
    EmpName: string
    cusName: string
    payNumber: number,
    payThisWeek: undefined,
    visitNumber: number,
    visitList: cusVisitList_res,
}

export function useAtuVisit() {
    const { thisYear, thisMonth } = useAppSelector(state => state.time)
    const [visitData, setVisitData] = useState<visitData[]>([])
    const {id2name} = useId2name()
    const search = useSearchParams()[0]

    const search_month = search.get('month')
    const search_EmpId = search.get('EmpId')


    useEffect(() => {
        const month = getMonthArray(search_month);

        (async function () {
            const res = month ? await Promise.all(month.map(async (month) => await api.getAtuVisit({
                year: thisYear,
                month: month
            }))) : [await api.getAtuVisit({
                year: thisYear,
            })]

            const dataSet = res.reduce((a, b) => a.concat(b), [])

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
            });
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

            if (search_EmpId) {
                const EmpName = await id2name(search_EmpId)
                setVisitData(atuVisit.filter(data=>data.EmpName === EmpName))
            }else {
                setVisitData(atuVisit)
            }

        })()
    }, [id2name, search_EmpId, search_month, thisMonth, thisYear])

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

    const maxLength = visitData.sort(
        (a, b) => b.visitList.length - a.visitList.length
    )[0]?.visitList.length;

    const visitData_fullData = useMemo(() => visitData.map((data) => ({
        ...data,
        visitList: addEmptyData(data.visitList, maxLength),
    })).sort((a, b) => new Date(b.visitList[0].StartDT).getTime() - new Date(a.visitList[0].StartDT).getTime()), [maxLength, visitData]);

    const indexArray = useMemo(() => {
        const array: number[] = []
        for (let i = 1; i <= maxLength; i++) {
            array.push(i)
        }
        return array
    }, [maxLength])

    return { visitData: visitData_fullData, indexArray }
}