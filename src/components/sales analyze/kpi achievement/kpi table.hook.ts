import api from "@/api";
import { visit_otherResType } from "@/api/visit store/visit store";
import { useAppSelector } from "@/data/store";
import { useId2name } from "@/hooks/id2name";
import { dateFormatter } from "@/utils/dateFormatter";
import { useQuery } from "@tanstack/react-query";
import { timeFormat } from "d3";
import { useSearchParams } from "react-router-dom";

export type getVisitStore = Record<"atu" | "existCus" | "newCus", number>
type getKpiNumber = Record<"photo" | "introduce" | "login" | "tireStorageData", number>
type getKpiAchievement = {
    photo: string;
    introduce: string;
    login: string;
    tireStorageData: string;
}

export function useKpiTable() {
    const { thisYear, thisMonth } = useAppSelector(state => state.time)
    const salesList = useAppSelector(state => state.salesList).body
    const { id2name } = useId2name()
    const search = useSearchParams()[0]
    const search_month = search.get('month')
    const search_EmpId = search.get('EmpId')

    return useQuery({
        queryKey: ['kpiAchievement', search_month, search_EmpId],
        queryFn: async () => {
            const salesKpiData = await Promise.all(salesList.map(async (member) => {
                const visitData = await getVisitStore(thisYear, search_month || thisMonth, member.EmpName)
                const kpiAchievement = await getKpiAchievement()
                const kpiNumber = await getKpiNumber(thisYear, search_month || thisMonth, member.EmpName)


                return {
                    EmpName: member.EmpName,
                    visitData,
                    kpiAchievement,
                    kpiNumber
                }
            }))

            if (search_EmpId) {
                const EmpName = await id2name(search_EmpId)
                return salesKpiData.filter(data => data.EmpName === EmpName)
            }
            return salesKpiData
        }
    })
}


async function getVisitStore(year: string, month: string, EmpName?: string): Promise<getVisitStore> {
    const visitData = (await api.getVisitData.week({
        startDate: getRequestDate(year, month).startDate,
        endDate: getRequestDate(year, month).endDate
    })).filter(data => data.empname === EmpName)

    const { atu, existCus, newCus } = visitData.reduce<Record<'atu' | 'existCus' | 'newCus', visit_otherResType[]>>((a, b) => {
        if (b.ResourcesName === '拜訪A.T.U.') {
            a.atu.push(b)
        }
        if (b.ResourcesName === '拜訪現有客戶') {
            a.existCus.push(b)
        }
        if (b.ResourcesName === '拜訪新客戶') {
            a.newCus.push(b)
        }
        return a
    }, {
        atu: [],
        existCus: [],
        newCus: []
    })

    return {
        atu: atu.map(data => Number(data.Vqty)).reduce((a, b) => a + b, 0),
        existCus: existCus.map(data => Number(data.Vqty)).reduce((a, b) => a + b, 0),
        newCus: newCus.map(data => Number(data.Vqty)).reduce((a, b) => a + b, 0),
    }
}

async function getKpiNumber(year: string, month: string, EmpName?: string): Promise<getKpiNumber> {
    const requestMonth = getRequestMonth({ year: year, month: month })
    const thisMonthKpiNumbers = (await api.getKpiNumber({
        year: requestMonth.thisMonth.year,
        month: requestMonth.thisMonth.month
    })).find(data => data.empname === EmpName)
    const prevMonthKpiNumbers = (await api.getKpiNumber({
        year: requestMonth.prevMonth.year,
        month: requestMonth.prevMonth.month
    })).find(data => data.empname === EmpName)

    return {
        photo: 0,
        introduce: thisMonthKpiNumbers?.CoQty || 0,
        login: (thisMonthKpiNumbers?.LogQty || 0) - (prevMonthKpiNumbers?.LogQty || 0),
        tireStorageData: (thisMonthKpiNumbers?.LpQty || 0) - (prevMonthKpiNumbers?.LpQty || 0)
    }

}

async function getKpiAchievement(): Promise<getKpiAchievement> {
    const photo = (await api.basicSetting.get({
        webName: "GER_kpiSetting_store",
        key: "upload_photo"
    }))[0]?.SetValue || '0'
    const introduce = (await api.basicSetting.get({
        webName: "GER_kpiSetting_osom",
        key: "recommend_store"
    }))[0]?.SetValue || '0'
    const login = (await api.basicSetting.get({
        webName: "GER_kpiSetting_osom",
        key: "osom_login"
    }))[0]?.SetValue || '0'
    const tireStorageData = (await api.basicSetting.get({
        webName: "GER_kpiSetting_osom",
        key: "tireStorage_data"
    }))[0]?.SetValue || '0'

    return {
        photo,
        introduce,
        login,
        tireStorageData
    }
}

function getRequestMonth({ year, month }: { year: string, month: string }) {
    const date = `${year}-${month}-1`
    const thisMonth = timeFormat('%Y-%m')(new Date(date))
    const prevMonth = timeFormat('%Y-%m')(new Date(new Date(date).setDate(0)))

    return {
        thisMonth: {
            year: thisMonth.split('-')[0],
            month: thisMonth.split('-')[1]
        },
        prevMonth: {
            year: prevMonth.split('-')[0],
            month: prevMonth.split('-')[1]
        }
    }
}

function getRequestDate(year: string, month: string) {
    const startDate = dateFormatter(`${year}-${month}-1`)

    const lastDayOfThisMonth = new Date(new Date(new Date(`${year}-${(month)}-1`).setDate(35)).setDate(0))

    const endDate = dateFormatter(lastDayOfThisMonth)

    return {
        startDate,
        endDate
    }

}