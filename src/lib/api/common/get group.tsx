import axios from "axios";

export function getGroup(apiPath: string) {
  return async function (id:string) {
    const res = await axios({
      method: "POST",
      url: `${apiPath}/GetEmpGroup`,
      data: {
        EmpId: id, //工號
      },
    });
    return res.data;
  };
}
