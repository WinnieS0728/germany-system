import axios from "axios"


interface props {
    ErpNo: string
}

export type orderDateList_res = {
    cu_no: string
} & Record<string, string>


export function getOrderDateList(apiPath: string) {
    return async function ({ ErpNo }: props) {
        const res = await axios<orderDateList_res[]>({
            url: `${apiPath}/dynamicpivot`,
            method: "POST",
            data: {
                "ErpNo": ErpNo
            }
        })

        return res.data[0]
    }
}