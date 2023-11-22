import axios from "axios"
import { z } from "zod"

interface unVisitTS_req {
    startDate: string,
    endDate: string
}

const unOrderTS_res_schema = z.array(z.object({
    "Empname": z.string(),
    "custid": z.string(),
    "Custname": z.string(),
    "ERPNO": z.string(),
    "Phone": z.string(),
    "Address": z.string(),
    "Country": z.string(),
    "City": z.string(),
    "PostalCode": z.string(),
    "State": z.string(),
    "Sqty": z.coerce.number(),
    "LastDate": z.string()
}))

export type unOrderTS_res = z.infer<typeof unOrderTS_res_schema>

export function getUnOrderTireShop(apiPath: string) {

    return async function ({
        startDate, endDate
    }: unVisitTS_req) {
        const res = await axios<unOrderTS_res>({
            // TODO apiPath
            url: `${apiPath}/GetSalesVisitDe`,
            method: "POST",
            data: {
                "Startdt": startDate,
                "Enddt": endDate,
                "type": "1"
            }
        })

        const validData = unOrderTS_res_schema.safeParse(res.data)

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}