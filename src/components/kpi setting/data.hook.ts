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


const 螢幕挑選 = {
    大小: {
        21: '有點太小 看桌子深度或桌面寬度',
        24: '最常用',
        27: '最常用 推薦這個',
        28: '比較少見',
        30: '比較少見',
        32: '有點太大 會有壓迫感 但大螢幕就很爽 看人',
        參考: '常見筆電會做到 16-17 左右, 我的是 27 的'
    },
    比例: {
        '16:9': '最常見',
        '16:10': '比上面那個寬一點 做文書的話會比較舒服一點',
        '21:9': '超寬螢幕 比較常拿來打遊戲'
    },
    面版: {
        IPS: '常做平面, 顏色比較好看 比較鮮豔',
        VA: '常做曲面, 對比比較好 黑色更黑'
    },
    解析度: 'FHD(1920 * 1080)是基本 想要好一點可以上 2k 但價錢 upup',
    刷新率: '基本 60 想要好一點可以到 75',
    接口: {
        HDMI: '必須有的',
        DP: '桌電比較常遇到, 筆電比較少, 也是影像接頭的一種',
        VGA: '老電腦會是這個接頭 看家裡電腦有沒有'
    },
    附加加值: {
        '抗藍光': '保護眼睛 但螢幕會黃黃的'
    }
}