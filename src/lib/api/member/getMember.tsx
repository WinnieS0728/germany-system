import axios from "axios";

export function getMemberList(apiPath: string) {
  return async function (id?: string, dept?: string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetDeptEmp`,
      data: {
        DeptId: dept || "", //部門代號
        EmpId: id || "", //工號
        Company: "", //公司
      },
    });
    return res.data;
  };
}
