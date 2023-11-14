import axios from "axios"
import { z } from "zod"

const tireShopVisitList_schema = z.array(z.intersection(z.object({
    custid: z.string()
}), (z.record(z.string(), z.string()))))

type tireShopVisitList = z.infer<typeof tireShopVisitList_schema>

export function getTireShopVisitList(apiPath: string) {
    return async function (cusId: string) {
        const res = await axios<tireShopVisitList>({
            url: `${apiPath}/VisitRecord`,
            method: "POST",
            data: { "custid": cusId }
        })

        const validData = tireShopVisitList_schema.safeParse(res.data)

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}