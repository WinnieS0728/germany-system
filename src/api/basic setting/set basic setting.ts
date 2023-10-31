import { webNames } from "@/const"
import axios from "axios"

type setBasicSetting_req = {
    webName: typeof webNames[number], key: string, value: string, EmpId: string
}

export function setBasicSetting(apiPath: string) {
    return async function ({ webName, key, value, EmpId }:setBasicSetting_req) {        
        const res = await axios<string>({
            url: `${apiPath}/BasicSetAdd`,
            method: "POST",
            data: {
                "BASID": "", //單號
                "ComId": "",// 公司id
                "DeptId": "",// 部門id
                "WebName": webName, //網頁名稱，或是用在什麼地方
                "ColName": key, // 行的名稱，怎麼取都行，看大家怎麼用
                "SetValue": value,// 設定的值 如 目標是三十 就設定三十
                "Remark": "", //備註
                "CreateId": EmpId, //建檔人
                "CreateDate": "", //建檔日
                "Type": "0" // 0 新增 1 修改狀態
            }
        })

        // return 單號 BASID
        return res.data
    }
}