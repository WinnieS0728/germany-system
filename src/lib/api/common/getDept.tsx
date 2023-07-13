import axios from "axios";

export function getDept(apiPath: string) {
  return async function () {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetDept`,
      data: {
        DeptId: "", //部門別
        DeptName: "", //部門名稱
      },
    });
    return res.data;
  };
}
