import api from "@/api";
import { orderDateList_res } from "@/api/sales analyze/order date list";
import { dateFormatter } from "@/utils/dateFormatter";
import { useAppSelector } from "@data/store";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

type salesListData = {
    id: number,
    EmpId: string
    sa_name: string,
    cu_name: string,
    tx: number,
    isFirstOrder: boolean,
    lastDate: string,
    orderTime: number,
    salesArray: string[]
}

export function useSalesList() {
    const { thisYear, thisMonth } = useAppSelector(state => state.time)
    const [salesListData, setSalesListData] = useState<salesListData[]>([])
    const [search] = useSearchParams()
    const searchMonth = search.get('month')
    const searchEmpId = search.get('EmpId')

    const getMonthArray = useCallback(() => {
        if (!searchMonth) {
            return undefined
        }
        const startMonth = searchMonth.split('_')[0]
        const endMonth = searchMonth.split('_')[1]
        if (!endMonth) {
            return [startMonth]
        }
        const monthArray: string[] = []

        for (let month = Number(startMonth); month <= Number(endMonth); month++) {
            const MM = month < 10 ? `0${month}` : String(month)

            monthArray.push(MM)
        }

        return monthArray
    }, [searchMonth])

    const getLastDate = useCallback((dateObj: orderDateList_res) => {
        const lastDate = Object.values(dateObj).at(-1)
        const isFirstOrder = Object.values(dateObj).length <= 2 ? true : false

        return { isFirstOrder, lastDate }
    }, [])

    useEffect(() => {
        const month = getMonthArray();
        (async function () {
            const res = month ? (
                await Promise.all(
                    month.map(
                        async (month) =>
                            await api.getSalesDetailQty({ year: thisYear, month: month })
                    )
                )
            ) : ([await api.getSalesDetailQty({ year: thisYear })])

            const salesListRes = res
                .reduce((a, b) => a.concat(b), [])
                .filter((data) => data.cu_sale !== "ER221001");
            const allData: typeof salesListRes = salesListRes.map((res) => {
                const sameCus = salesListRes.filter((data) => data.cu_no === res.cu_no);
                const tx_sum = sameCus
                    .map((data) => data.sqty)
                    .reduce((a, b) => a + b, 0);
                const o_sum = sameCus
                    .map((data) => data.oqty)
                    .reduce((a, b) => a + b, 0);
                return {
                    ...res,
                    sqty: tx_sum,
                    oqty: o_sum,
                };
            });
            const onlyId = [...new Set(allData.map((data) => data.cu_no))];

            const array = onlyId.map((id) => allData.find((data) => data.cu_no === id)) as typeof salesListRes

            const data: salesListData[] = (await Promise.all(array.map(async (data, index) => {
                const orderDateList = await api.getOrderDateList({ ErpNo: data.cu_no })
                return {
                    id: index,
                    EmpId: data.cu_sale,
                    sa_name: data.pa_ena,
                    cu_name: data.cu_na,
                    tx: Number(data.sqty),
                    isFirstOrder: getLastDate(orderDateList).isFirstOrder,
                    lastDate: dateFormatter(getLastDate(orderDateList).lastDate as string),
                    orderTime: Object.values(orderDateList).length - 1,
                    salesArray: Object.values(orderDateList).slice(1)
                }
            })))

            if (searchEmpId) {
                setSalesListData(data.filter(data => data.EmpId === searchEmpId))
            } else {
                setSalesListData(data)
            }

        })()
    }, [searchEmpId, getLastDate, thisMonth, thisYear, getMonthArray])

    function addEmptyData(array: string[], maxNumber: number) {
        const newArray = [...array];

        for (let i = 0; i < maxNumber - array.length; i++) {
            newArray.push("");
        }

        return newArray;
    }

    const maxLength = salesListData.sort(
        (a, b) => b.salesArray.length - a.salesArray.length
    )[0]?.salesArray.length;

    const salesListData_fullData = useMemo(() => salesListData.map((data) => ({
        ...data,
        salesArray: addEmptyData(data.salesArray, maxLength),
    })).sort((a, b) => new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime()), [maxLength, salesListData]);

    const indexArray = useMemo(() => {
        const array: number[] = []
        for (let i = 1; i <= maxLength; i++) {
            array.push(i)
        }
        return array
    }, [maxLength])

    return { salesListData: salesListData_fullData, indexArray }
}