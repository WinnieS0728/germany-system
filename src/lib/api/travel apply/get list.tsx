import axios from "axios";

interface data {
  formStatus?: string;
  EmpId?: string;
  dept?: string;
}
export function getBusinessApplyList(apiPath: string) {
  return async function (data: data) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetTraveAppList`,
      data: {
        Status: data.formStatus || "", //狀態
        Createid: data.EmpId || "", //建檔人
        DeptId: data.dept || "", //部門id
      },
    });
    return res.data;
  };
}
