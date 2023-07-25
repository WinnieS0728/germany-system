import axios from "axios";

interface data {
  status?: string;
  id?: string;
  deptId?: string;
}
export function getBusinessApplyList(apiPath: string) {
  return async function (data: data) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetTraveAppList`,
      data: {
        Status: data.status || "", //狀態
        Createid: data.id || "", //建檔人
        DeptId: data.deptId || "", //部門id
      },
    });
    return res.data;
  };
}
