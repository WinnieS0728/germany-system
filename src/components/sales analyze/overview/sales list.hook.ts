import api from "@/api";
import { salesDetailQty_res } from "@/api/sales analyze/sales detail qty";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMonthArray } from "@/utils/get month_MM array";
import { useAppSelector } from "@data/store";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export type salesListData = {
    id: string,
    EmpId: string,
    sa_name: string,
    cu_name: string,
    tx: number,
    isFirstOrder: boolean,
    orderTime: number,
    salesArray: string[]
}


export function useSalesList() {
    const { thisYear } = useAppSelector(state => state.time)
    const salesList = useAppSelector(state => state.salesList).body
    const [search] = useSearchParams()
    const searchMonth = search.get('month')
    const searchEmpId = search.get('EmpId')

    const monthList = getMonthArray(searchMonth);

    return useQuery({
        queryKey: ['overview', 'salesList', monthList, searchEmpId],
        queryFn: async () => {
            const orderList = (await Promise.all(salesList.map(async (member) => getOrderList(monthList, member.EmpId)))).reduce((a, b) => a.concat(b), [])
            const dataSet: salesListData[] = await Promise.all(orderList.map(async (data) => {
                const orderDateList = await getOrderDateList(data.cu_no)
                const orderTime = orderDateList.orderDateList.length

                return {
                    id: data.cu_no,
                    EmpId: data.cu_sale,
                    sa_name: data.pa_ena,
                    cu_name: data.cu_na,
                    tx: data.sqty,
                    isFirstOrder: orderDateList.isFirstOrder,
                    orderTime,
                    salesArray: orderDateList.orderDateList.map(date => dateFormatter(date, {type: '%d/%m/%Y'}))
                }
            }))

            const maxLength = [...dataSet].sort((a, b) => b.salesArray.length - a.salesArray.length)[0].salesArray.length

            const dataSet_withEmptyData = dataSet.map(data => ({
                ...data,
                salesArray: addEmptyData(data.salesArray, maxLength)
            }))

            const indexArray = getIndexArray(maxLength)

            if (searchEmpId) {
                return {
                    dataSet: dataSet_withEmptyData.filter(data => data.EmpId === searchEmpId),
                    indexArray
                }
            }

            return { dataSet: dataSet_withEmptyData, indexArray }
        }
    })

    async function getOrderList(monthList: string[] | undefined, EmpId: string) {
        if (monthList) {
            const orderList_res = (await Promise.all(monthList.map(async (month) => {
                const orderList_res = await api.getSalesDetailQty({
                    year: thisYear,
                    month
                })
                return orderList_res
            }))).reduce((a, b) => a.concat(b), []).filter(data => data.cu_sale === EmpId)

            const sumData = orderList_res.map(res => {
                const tx_sum = orderList_res.filter(data => data.cu_no === res.cu_no).map(data => data.sqty).reduce((a, b) => a + b, 0)
                const order_sum = orderList_res.filter(data => data.cu_no === res.cu_no).map(data => data.oqty).reduce((a, b) => a + b, 0)

                return {
                    ...res,
                    sqty: tx_sum,
                    oqty: order_sum
                }
            })

            const onlyId = [...new Set(sumData.map(data => data.cu_no))]

            const dataSet = onlyId.map(id => sumData.find(data => data.cu_no === id) as salesDetailQty_res[number])
            return dataSet
        }
        const dataSet = await api.getSalesDetailQty({
            year: thisYear
        })

        return dataSet.filter(data => data.cu_sale === EmpId)
    }

    async function getOrderDateList(cu_no: string) {
        const orderDateList = Object.values(await api.getOrderDateList({ ErpNo: cu_no })).slice(1).map(date => dateFormatter(date)).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        const isFirstOrder = orderDateList.length === 1 ? true : false

        if (monthList) {
            return {
                orderDateList: orderDateList.filter(date => {
                    const dataMonth = date.split('-')[1]
                    return monthList.some(month => dataMonth === month)
                }),
                isFirstOrder
            }
        }
        return { orderDateList, isFirstOrder }
    }

    function addEmptyData(array: string[], maxNumber: number) {
        const newArray = [...array];

        for (let i = 0; i < maxNumber - array.length; i++) {
            newArray.push("");
        }

        return newArray;
    }

    function getIndexArray(maxNumber: number) {
        const indexArray: number[] = []
        for (let i = 1; i <= maxNumber; i++) {
            indexArray.push(i)
        }

        return indexArray
    }
}