import axios from "axios"
import { z } from "zod"


const atuPayment_schema = z.array(z.object({
    Custname: z.string(),
    Empname: z.string(),
    State: z.string(),
    MM: z.coerce.number(),
    Sqty: z.coerce.number()
}))

export type atuPayment = z.infer<typeof atuPayment_schema>

export function getAtuPayment(apiPath: string) {
    return async function (year: string) {
        const res = await axios<atuPayment>({
            url: `${apiPath}/GetMonthAtuSqty`,
            method: "POST",
            data: {
                "YYYY": year
            }
        })       

        const validData = atuPayment_schema.safeParse(res.data)

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}