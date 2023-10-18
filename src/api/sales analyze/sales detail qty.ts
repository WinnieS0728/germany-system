import axios from "axios"

interface props {
    EmpId?: string,
    year: string,
    month?: string
}

type salesDetailQty_res = {
    cu_sale: string,
    pa_ena: string,
    cu_no: string,
    cu_na: string,
    sqty: string,
    oqty: string
}

export function getSalesDetailQty(apiPath: string) {
    return async function ({ EmpId, year, month }: props) {
        const res = await axios<salesDetailQty_res[]>({
            url: `${apiPath}/GetSaleDetailQty`,
            method: "POST",
            data: {
                "Empid": EmpId,
                "YYYY": year,
                "MM": month
            }
        })

        return res.data
    }
}