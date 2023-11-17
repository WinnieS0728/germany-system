import axios from "axios"
import z from "zod"

const cusVisitList_res_schema = z.array(z.object({
    "custname": z.string(),
    "StartDT": z.string(),
    "BTRId": z.string()
}))

export type cusVisitList_res = z.infer<typeof cusVisitList_res_schema>

export function getCusVisitList(apiPath: string) {
    return async function (cusId: string) {
        const res = await axios<cusVisitList_res>({
            url: `${apiPath}/GetCUSTVISITData`,
            method: "POST",
            data: {
                "Custid": cusId,
                "type": "0"
            }
        })

        const validData = cusVisitList_res_schema.safeParse(res.data)

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}