import { webNames } from "@/const"
import axios from "axios"
import z from "zod"

const schema = z.array(z.object({
    "BASID": z.string(),
    "ComId": z.string(),
    "DeptId": z.string(),
    "WebName": z.string().refine(value => webNames.some(name => name === value)),
    "ColName": z.string(),
    "SetValue": z.string(),
    "Remark": z.string(),
    "CreateId": z.string(),
    "CreateDate": z.string()
}))

type basicSetting_res = z.infer<typeof schema>

type getBasicSetting_req = {
    webName: typeof webNames[number], basId?: string, key?: string
}

export function getBasicSetting(apiPath: string) {
    return async function ({ webName, basId, key }: getBasicSetting_req) {
        const res = await axios<basicSetting_res>({
            url: `${apiPath}/GetBasicSetList`,
            method: "POST",
            data: {
                "BASID": basId || "",  //單號
                "WebName": webName, //網頁名稱，或是用在什麼地方
                "ColName": key || "" // 行的名稱，怎麼取都行，看大家怎麼用
            }
        })

        const validData = schema.safeParse(res.data)
        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}