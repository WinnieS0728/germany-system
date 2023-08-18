import axios, { AxiosResponse } from "axios";

type empGroupResType = {
  GroupID: string;
  EmpId: string;
};
export function getGroup(apiPath: string) {
  return async function (id: string) {
    const res: AxiosResponse<empGroupResType[]> = await axios({
      method: "POST",
      url: `${apiPath}/GetEmpGroup`,
      data: {
        EmpId: id, //工號
      },
    });
    return res.data;
  };
}
