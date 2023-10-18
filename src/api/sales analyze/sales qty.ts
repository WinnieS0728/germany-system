import axios from "axios"
import { z } from 'zod'

interface props {
    EmpId: string,
    year: string,
    month?: string
}

const getSalesQty_schema = z.object({
    cu_sale: z.string(),
    pa_ena: z.string(),
    ogqty: z.coerce.number(),
    sqty: z.coerce.number(),
    oqty: z.coerce.number(),
    cqty: z.coerce.number()
})

type getSalesQty_res = z.infer<typeof getSalesQty_schema>

export function getSalesQty(apiPath: string) {
    return async function ({ EmpId, year, month }: props) {
        const res = await axios<getSalesQty_res[]>({
            url: `${apiPath}/GetSaleQty`,
            method: "POST",
            data: {
                "Empid": EmpId,
                "YYYY": year,
                "MM": month
            }
        })

        const validData = getSalesQty_schema.safeParse(res.data[0])

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}