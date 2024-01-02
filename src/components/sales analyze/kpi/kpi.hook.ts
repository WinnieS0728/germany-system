import api from '@/api'
import { dateInfo } from '@/const'
import { useQuery } from '@tanstack/react-query'
// import _ from 'lodash'
export function useKpiData() {
    const { thisYear } = dateInfo
    return useQuery({
        queryKey: ['salesAnalyze', 'kpiPage', { type: 'all' }],
        queryFn: async () => {
            const txData = await getTx({ year: thisYear })
            const atuVisit = await getATUVisit({ year: thisYear })
            const kpiNumber = await getKpiNumber({ year: thisYear })

            console.log(txData, atuVisit, kpiNumber);

            return 0
        }
    })
}


interface yearMonthRequest {
    year: string,
    month?: string
}
async function getTx({
    year, month
}: yearMonthRequest) {
    const res = (await api.getSalesQty({ year, month })).filter(data => data.pa_ena)
    return res.map(data => ({
        EmpId: data.cu_sale,
        EmpName: data.pa_ena,
        txNumber: data.sqty
    }))
}

async function getATUVisit({ year, month }: yearMonthRequest) {
    const res = await api.getAtuVisit({ year, month })
    return res.map(data => ({
        EmpName: data.Empname,
        custId: data.Custid,
        custName: data.Custname,
        visitNumber: data.vqty,
        payNumber: data.Sqty
    }))
}

async function getKpiNumber({ year, month }: yearMonthRequest) {
    const res = await api.getKpiNumber({ year, month })
    return res.map(data => ({
        EmpName: data.empname,
        recommend: data.CoQty,
        tsData: data.LpQty,
        login: data.LogQty
    }))
}
