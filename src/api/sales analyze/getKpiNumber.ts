import axios from "axios"
import { z } from "zod"

interface request {
    year: string,
    month?: string
}

const kpiNumber_schema = z.array(z.object({
    "empname": z.string(),
    "CoQty": z.coerce.number(),
    "LpQty": z.coerce.number(),
    "LogQty": z.coerce.number()
}))

type kpiNumber_res = z.infer<typeof kpiNumber_schema>

export function getKpiNumber() {
    return async function ({ year, month }: request) {
        const res = await axios<kpiNumber_res>({
            url: `https://osomapi.orange-electronic.com:30678/api/GetSalesVisitMysql`,
            method: "POST",
            data: {
                "YYYY": year,
                "MM": month || ""
            }
        })

        const validData = kpiNumber_schema.safeParse(res.data)

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}