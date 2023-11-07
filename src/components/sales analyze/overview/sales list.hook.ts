import api from "@/api";
import { orderDateList_res } from "@/api/sales analyze/order date list";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMonthArray } from "@/utils/get month_MM array";
import { useAppSelector } from "@data/store";
import { useCallback, useEffect, useState } from "react";
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

type salesListReturn = {
    salesListData: salesListData[],
    indexArray: number[]
}



export function useSalesList(): salesListReturn {
    const { thisYear } = useAppSelector(state => state.time)
    const [search] = useSearchParams()
    const searchMonth = search.get('month')
    const searchEmpId = search.get('EmpId')

    const [salesListData, setSalesListData] = useState<salesListReturn>({
        salesListData: [],
        indexArray: [1, 2, 3]
    })


    const getLastDate = useCallback((dateObj: orderDateList_res) => {
        const lastDate = Object.values(dateObj).at(-1)
        const isFirstOrder = Object.values(dateObj).length <= 2 ? true : false
        return { isFirstOrder, lastDate }
    }, [])

    useEffect(() => {
        const monthList = getMonthArray(searchMonth);
        (async function () {
            const res = monthList ? (
                await Promise.all(
                    monthList.map(
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

            const salesListDataArray = onlyId.map((id) => allData.find((data) => data.cu_no === id)) as typeof salesListRes;

            const salesListData = await Promise.all(salesListDataArray.map(async (data, index) => {
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
                    salesArray: Object.values(orderDateList).slice(1).map(date => date.replace(/\//gi, '-')).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
                }
            }))

            const maxLength = salesListData.sort(
                (a, b) => b.salesArray.length - a.salesArray.length
            )[0]?.salesArray.length || 0;

            const salesListData_fullData = salesListData.map((data) => ({
                ...data,
                salesArray: addEmptyData(data.salesArray, maxLength),
            })).sort((a, b) => new Date(b.lastDate).getTime() - new Date(a.lastDate).getTime())

            if (searchEmpId) {
                setSalesListData({
                    salesListData: salesListData_fullData.filter(data => data.EmpId === searchEmpId),
                    indexArray: getIndexArray(maxLength)
                })
            } else {
                setSalesListData({
                    salesListData: salesListData_fullData,
                    indexArray: getIndexArray(maxLength)
                })
            }
        })()
    }, [getLastDate, searchEmpId, searchMonth, thisYear]);

    return salesListData



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