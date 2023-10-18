import api from "@/api";
import { orderDateList_res } from "@/api/sales analyze/order date list";
import { dateFormatter } from "@/utils/dateFormatter";
import { useAppSelector } from "@/utils/redux";
import { useEffect, useMemo, useState } from "react";

type salesListData = {
    id: number,
    sa_name: string,
    cu_name: string,
    tx: number,
    isFirstOrder: boolean,
    lastDate: string,
    orderTime: number,
    salesArray: string[]
}

function getLastDate(dateObj: orderDateList_res) {
    const lastDate = Object.values(dateObj).at(-1)
    const isFirstOrder = Object.values(dateObj).length <= 2 ? true : false

    return { isFirstOrder, lastDate }
}

function addEmptyData(array: string[], maxNumber: number) {
    const newArray = [...array];

    for (let i = 0; i < maxNumber - array.length; i++) {
        newArray.push("");
    }

    return newArray;
}

export function useSalesList() {
    const { thisYear, thisMonth } = useAppSelector(state => state.time)
    const [salesListData, setSalesListData] = useState<salesListData[]>([])

    useEffect(() => {
        (async function () {
            const salesListRes = (await api.getSalesDetailQty({ year: thisYear })).filter(data=>data.cu_sale !== "ER221001")

            const data: salesListData[] = (await Promise.all(salesListRes.map(async (data, index) => {
                const orderDateList = await api.getOrderDateList({ ErpNo: data.cu_no })
                return {
                    id: index,
                    sa_name: data.pa_ena,
                    cu_name: data.cu_na,
                    tx: Number(data.sqty),
                    isFirstOrder: getLastDate(orderDateList).isFirstOrder,
                    lastDate: dateFormatter(getLastDate(orderDateList).lastDate as string),
                    orderTime: Object.values(orderDateList).length - 1,
                    salesArray: Object.values(orderDateList).slice(1)
                }
            })))


            setSalesListData(data)
        })()
    }, [thisMonth, thisYear])

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