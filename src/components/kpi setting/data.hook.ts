import api from "@/api"
import { kpiType, postKpiRequest } from "@/api/kpi setting"
import { useAppSelector } from "@/data/store"
import { useTime } from "@/hooks/useTime"
import { queryClient } from "@/main"
import { useMutation, useQuery } from "@tanstack/react-query"

export function useKpiSetting(type: kpiType) {
    const { thisYear } = useTime()

    function GetThreshold(EmpId?: string) {
        return useQuery({
            queryKey: ['kpiSetting', type, { EmpId, year: thisYear }],
            queryFn: async () => {
                const res = await api.getKpi({ year: thisYear, EmpId: EmpId ?? '', type })
                return res.map((data) => {
                    return {
                        EmpId: data.Empid,
                        monthData: [
                            data.Jan,
                            data.Feb,
                            data.Mar,
                            data.Apr,
                            data.May,
                            data.Jun,
                            data.Jul,
                            data.Aug,
                            data.Sep,
                            data.Oct,
                            data.Nov,
                            data.Dec,
                        ]
                    }
                })
            }
        })
    }

    function PostThreshold() {
        const { EmpId: createId } = useAppSelector(state => state.nowUser).body

        return useMutation({
            mutationFn: async ({ EmpId, data, postType }: Pick<postKpiRequest, 'EmpId' | 'data' | 'postType'>) => {
                const res = await api.postKpi({
                    year: thisYear,
                    EmpId,
                    type,
                    data,
                    postType,
                    createId
                })
                return res
            },
            onSuccess: (_, { EmpId }) => {
                queryClient.invalidateQueries({
                    queryKey: ['kpiSetting', type, { EmpId }]
                })
            }
        })
    }


    return { GetThreshold, PostThreshold }
}