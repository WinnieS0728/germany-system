import axios from "axios"
import { z } from "zod"

type getTireShopVisit_req = {
    year: string,
    month?: string
}

const tireShopVisit_schema = z.array(z.object({
    "ErpNo": z.string(),
    "CustId": z.string(),
    "Custname": z.string(),
    "Phone": z.string(),
    "Address": z.string(),
    "Country": z.string(),
    "City": z.string(),
    "PostalCode": z.string(),
    "State": z.string(),
    "SumQty": z.coerce.number(),
    "Empname": z.string(),
    "vqty": z.coerce.number(),
    "Oqty": z.coerce.number()
}))

export type tireShopVisit = z.infer<typeof tireShopVisit_schema>

export function getTireShopVisit() {
    return async function ({ year, month }: getTireShopVisit_req) {
        const res = await axios<tireShopVisit>({
            url: "https://orangeosomapi.orange-electronic.com/api/GetTireStroeQty",
            method: "POST",
            data: {
                "YYYY": year,
                "MM": month
            }
        })

        const validData = tireShopVisit_schema.safeParse(res.data)

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}