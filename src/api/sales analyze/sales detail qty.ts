import axios from "axios"
import z from "zod"

interface props {
    EmpId?: string,
    year: string,
    month?: string
}

const salesDetailQty_schema = z.array(z.object({
    cu_sale: z.string(),
    pa_ena: z.string(),
    cu_no: z.string(),
    cu_na: z.string(),
    sqty: z.coerce.number(),
    oqty: z.coerce.number()
}))

type salesDetailQty_res = z.infer<typeof salesDetailQty_schema>

export function getSalesDetailQty(apiPath: string) {
    return async function ({ EmpId, year, month }: props) {
        const res = await axios<salesDetailQty_res>({
            url: `${apiPath}/GetSaleDetailQty`,
            method: "POST",
            data: {
                "Empid": EmpId,
                "YYYY": year,
                "MM": month
            }
        })

        const validRes = salesDetailQty_schema.safeParse(res.data)

        if (!validRes.success) {
            throw new Error('銷售列表該月無資料')
        }

        return validRes.data
    }
}