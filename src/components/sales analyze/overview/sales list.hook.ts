import api from "@/api";
import { orderDateList_res } from "@/api/sales analyze/order date list";
import { dateFormatter } from "@/utils/dateFormatter";
import { getMonthArray } from "@/utils/get month_MM array";
import { useAppSelector } from "@data/store";
import { useQueries, useQuery } from "@tanstack/react-query";
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
    status: 'idle' | 'pending' | 'error' | 'success',
    salesListData: salesListData[],
    indexArray: number[]
}



export function useSalesList(): salesListReturn {
    const { thisYear } = useAppSelector(state => state.time)
    const [search] = useSearchParams()
    const searchMonth = search.get('month')
    const searchEmpId = search.get('EmpId')

    const monthList = getMonthArray(searchMonth);

    const salesListQueries = useQueries({
        queries: monthList
            ? monthList.map(
                (month) => ({
                    queryKey: ["overview", "salesList", `month-${month}`],
                    queryFn: () => api.getSalesDetailQty({ year: thisYear, month: month })
                })
            )
            : [{
                queryKey: ["overview", "salesList", "fullYear"],
                queryFn: () => api.getSalesDetailQty({ year: thisYear })
            }]
    })

    // if (salesListQueries.some(query => query.isLoading)) {
    //     return {
    //         status: 'pending',
    //         salesListData: [],
    //         indexArray: []
    //     }
    // } else if (salesListQueries.some(query => query.isError)) {
    //     return {
    //         status: 'error',
    //         salesListData: [],
    //         indexArray: []
    //     }
    // }
    const salesListRes = salesListQueries.map(query => query.data as NonNullable<typeof query.data>)
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

    const array = onlyId.map((id) => allData.find((data) => data.cu_no === id)) as typeof salesListRes;

    const orderDateQueries = useQueries({
        queries: array.map(data => ({
            queryKey: ["orderDate"],
            queryFn: api.getOrderDateList({ ErpNo: data.cu_no })
        }))
    });

    (async function () {
        const salesListData = await Promise.all(array.map(async (data, index) => {
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
            return {
                status: 'success',
                salesListData: salesListData_fullData.filter(data => data.EmpId === searchEmpId),
                indexArray: getIndexArray(maxLength)
            }
        } else {
            return {
                status: 'success',
                salesListData: salesListData_fullData,
                indexArray: getIndexArray(maxLength)
            }
        }
    })()

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

    function getIndexArray(maxNumber: number) {
        const indexArray: number[] = []
        for (let i = 1; i <= maxNumber; i++) {
            indexArray.push(i)
        }

        return indexArray
    }
}