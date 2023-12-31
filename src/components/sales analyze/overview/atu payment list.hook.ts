import api from "@/api";
import { Month_MM } from "@/const";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { month_shortName, queryStatus } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export type atuPaymentList = {
    EmpName: string,
    area: string,
    cusName: string,
    payNumber: number,
} & {
        [K in typeof month_shortName[number]]: number
    }

interface atuPaymentReturn extends queryStatus {
    atuPaymentList: atuPaymentList[]
}

export function useAtuPaymentList(): atuPaymentReturn {
    const { thisYear } = useAppSelector(state => state.time)
    const salesList = useAppSelector(state => state.salesList).body
    const search = useSearchParams()[0]
    const search_EmpId = search.get('EmpId')
    const { id2name } = useId2name()

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['overview', 'atuPayment', search_EmpId],
        queryFn: async () => {
            const atuPayment_allData = (await api.getAtuPayment(thisYear)).filter(data => salesList.some(member => member.EmpName === data.Empname))

            const cusList = [...new Set(atuPayment_allData.map(data => data.Custname))]

            const atuPayment_cusList = cusList.map(cusName => atuPayment_allData.filter(data => data.Custname === cusName))

            const dataSet: atuPaymentList[] = atuPayment_cusList.map(data => {
                const monthData = Month_MM.map(month => data.find(data => data.MM === Number(month))?.Sqty || 0)
                return {
                    EmpName: data[0].Empname,
                    area: data[0].State,
                    cusName: data[0].Custname,
                    payNumber: monthData.reduce((a, b) => a + b, 0),
                    [month_shortName[0]]: monthData[0],
                    [month_shortName[1]]: monthData[1],
                    [month_shortName[2]]: monthData[2],
                    [month_shortName[3]]: monthData[3],
                    [month_shortName[4]]: monthData[4],
                    [month_shortName[5]]: monthData[5],
                    [month_shortName[6]]: monthData[6],
                    [month_shortName[7]]: monthData[7],
                    [month_shortName[8]]: monthData[8],
                    [month_shortName[9]]: monthData[9],
                    [month_shortName[10]]: monthData[10],
                    [month_shortName[11]]: monthData[11],
                }
            })


            if (search_EmpId) {
                const EmpName = await id2name(search_EmpId)
                return dataSet.filter(data => data.EmpName === EmpName)
            }

            return dataSet
        }
    })

    if (isPending) {
        return {
            status: 'pending',
            atuPaymentList: []
        }
    }
    if (isError) {
        return {
            status: 'error',
            atuPaymentList: [],
            message: error.message
        }
    }
    return {
        status: 'success',
        atuPaymentList: data
    }
}