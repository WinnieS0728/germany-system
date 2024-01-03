import axios from "axios";
import { z } from "zod";

export type kpiType = 'tx' | 'store' | 'osom' | 'atu'
export interface getKpiRequest {
    year: string,
    EmpId: string,
    type: kpiType
}

export const getKpiSetting_res_Schema = z.array(z.object({
    YYYY: z.string(),
    Empid: z.string(),
    EmpName: z.string(),
    STYPE: z.enum(['TripEvent-7', 'tx', 'store', 'osom', 'atu']),
    Sname: z.string(),
    Jan: z.coerce.number().optional(),
    Feb: z.coerce.number().optional(),
    Mar: z.coerce.number().optional(),
    Apr: z.coerce.number().optional(),
    May: z.coerce.number().optional(),
    Jun: z.coerce.number().optional(),
    Jul: z.coerce.number().optional(),
    Aug: z.coerce.number().optional(),
    Sep: z.coerce.number().optional(),
    Oct: z.coerce.number().optional(),
    Nov: z.coerce.number().optional(),
    Dec: z.coerce.number().optional(),
    COUNTRY: z.enum(['GERMANY']),
    CREATEID: z.string(),
    CEmpName: z.string(),
    CREATEDATE: z.string(),
}))

export function getKpi(apiPath: string) {
    return async function ({ year, EmpId, type }: getKpiRequest) {
        const res = await axios({
            url: `${apiPath}/GetSalesCom`,
            method: "POST",
            data: {
                "YYYY": year,
                EmpId,
                "TYPE": type
            }
        })
        return getKpiSetting_res_Schema.parse(res.data)
    }
}

export interface postKpiRequest {
    year: string,
    EmpId: string,
    data: Partial<{
        Jan: number,
        Feb: number,
        Mar: number,
        Apr: number,
        May: number,
        Jun: number,
        Jul: number,
        Aug: number,
        Sep: number,
        Oct: number,
        Nov: number,
        Dec: number,
    }>,
    type: kpiType,
    postType: 'create' | 'update',
    createId: string
}

export function postKpi(apiPath: string) {
    return async function ({ year, EmpId, data, type, postType, createId }: postKpiRequest) {
        const res = await axios({
            url: `${apiPath}/SalesComAdd`,
            method: "POST",
            data: {
                "YYYY": year, //西元年
                "EmpId": EmpId, //員工  
                "STYPE": type, //類型 如即有客戶
                ...data,
                "COUNTRY": "GERMANY", //國家
                "CREATEID": createId, //建檔人
                "Type": postType === 'create' ? '0' : '1' //0 新增 1 修改
            }
        })
        return res.data
    }
}