import axios from "axios"
import { z } from "zod"

const tireShopVisitList_schema = z.array(z.object({
    cusid: z.string()
}).catchall(z.record(z.string(), z.string())))

type tireShopVisitList = z.infer<typeof tireShopVisitList_schema>

export function getTireShopVisitList() {
    return async function (cusId: string) {
        const res = await axios<tireShopVisitList>({
            url: 'https://orangeosomapi.orange-electronic.com/api/VisitRecord',
            method: "POST",
            data: { "cusid": cusId }
        })

        const validData = tireShopVisitList_schema.safeParse(res.data)

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}