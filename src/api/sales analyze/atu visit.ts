import axios from "axios"
import z from "zod"

interface atuVisit_req {
    year: string,
    month?: string
}

const atuVisit_res_schema = z.array(z.object({
    "Account": z.string(),
    "Custid": z.string(),
    "Custname": z.string(),
    "Empname": z.string(),
    "Phone": z.string(),
    "Address": z.string(),
    "Country": z.string(),
    "City": z.string(),
    "State": z.string(),
    "PostalCode": z.string(),
    "vqty": z.coerce.number(),
    "Sqty": z.coerce.number()
}))

type atuVisit = z.infer<typeof atuVisit_res_schema>

export function getAtuVisit() {
    return async function ({ year, month }: atuVisit_req) {
        const res = await axios<atuVisit>({
            url: 'https://orangeosomapi.orange-electronic.com/api/GetAtuSV',
            method: "POST",
            data: {
                "YYYY": year,
                "MM": month || ""
            }
        })

        const validData = atuVisit_res_schema.safeParse(res.data)

        if (!validData.success) {
            throw new Error(validData.error.message)
        }

        return validData.data
    }
}