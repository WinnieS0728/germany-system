import axios from "axios"
import { z } from "zod"

interface unVisitTS_req {
    startDate: string,
    endDate: string
}

const unVisitTS_res_schema = z.array(z.object({
    "Empname": z.string(),
    "custid": z.string(),
    "Custname": z.string(),
    "Phone": z.string(),
    "Address": z.string(),
    "Country": z.string(),
    "City": z.string(),
    "PostalCode": z.string(),
    "State": z.string(),
    "Vqty": z.coerce.number(),
    "LastDate": z.string()
}))

export type unVisitTS_res = z.infer<typeof unVisitTS_res_schema>

export function getUnVisitTireShop(apiPath: string) {
    return async function ({
        startDate, endDate
    }: unVisitTS_req) {
        const res = await axios<unVisitTS_res>({
            url: `${apiPath}/GetSalesVisitDe`,
            method: "POST",
            data: {
                "Startdt": startDate,
                "Enddt": endDate,
                "type": "0"
            }
        })

        const validData = unVisitTS_res_schema.safeParse(res.data)

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}