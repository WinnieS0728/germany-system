import axios, { AxiosResponse } from "axios";

export type memberResType = {
  DeptId: string;
  DeptName: string;
  DeptName_E: string;
  EmpId: string;
  EmpName: string;
  ResourcesId: string;
  ResourcesName: string;
  ResourcesName_E: string;
  Compose: string;
  FullName: string;
  Title: string;
  Language: "zh-TW" | "en-US";
};

export function getMemberList(apiPath: string) {
  return async function (id?: string, dept?: string) {
    const res: AxiosResponse<memberResType[]> = await axios({
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
