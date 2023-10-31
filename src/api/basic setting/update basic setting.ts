import { webNames } from "@/const"
import axios from "axios"

type updateBasicSetting_req = {
    basId: string, webName: typeof webNames[number], key: string, value: string, EmpId: string
}

export function updateBasicSetting(apiPath: string) {
    return async function ({ basId, webName, key, value, EmpId }: updateBasicSetting_req) {        
        const res = await axios<string>({
            url: `${apiPath}/BasicSetAdd`,
            method: "POST",
            data: {
                "BASID": basId, //單號
                "ComId": "",// 公司id
                "DeptId": "",// 部門id
                "WebName": webName, //網頁名稱，或是用在什麼地方
                "ColName": key, // 行的名稱，怎麼取都行，看大家怎麼用
                "SetValue": value,// 設定的值 如 目標是三十 就設定三十
                "Remark": "", //備註
                "CreateId": EmpId, //建檔人
                "CreateDate": "", //建檔日
                "Type": "1" // 0 新增 1 修改狀態
            }
        })

        // return 空值 ""
        if (res.data === '') {
            return '成功'
        }return '失敗'
    }
}